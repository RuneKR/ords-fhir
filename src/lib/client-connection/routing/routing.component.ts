import {HandlerOptions}                     from './models/handler-options';
import {RequestHandler}                     from './models/request-handler';
import {Router, Request, Response}          from 'express';
import {RouterContainer}                    from './models/router-container';
import {HookableComponent, HookableModels}  from 'make-it-hookable';

export class RoutingComponent {
    /**
     * Run prior to the handlers in the system
     */
    public preHandlers: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Run prior to the handlers in the system
     */
    public postHandlers: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Parse the HTTP body of the request
     */
    public bodyParse: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Authenticate the request
     */
    public authenticate: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Validates that the requested resource exists
     */
    public isResource: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Reference to express application instances
     * Use on OWN risk inteded visible for the Application class only
     */
    public _routers: RouterContainer = {
        resource: Router(),
        system: Router()
    };
    /**
     * Bind the hookable methods to the router
     */
    constructor() {

        this._routers.resource.use(this.isResource);
        this._routers.resource.use(this.authenticate);
        this._routers.system.use(this.authenticate);
    }
    /**
     * Add a handler to handle system interactions
     */
    public addToSystem(options: HandlerOptions, ...handlers: Array<RequestHandler>): void {

        // prepare a stack
        let stack: HookableModels.ArgumentableAll<Request, Response> = this.prepareStack(options, handlers);

        // push actual handler handler
        Array.prototype.push.apply(stack.actor, handlers);

        // prepare and add stack to router
        switch (options.httpmethod) {
            case 'GET':
                this._routers.system.get(options.path, stack);
                break;
            case 'POST':
                this._routers.system.post(options.path, this.bodyParse, stack);
                break;
            case 'PUT':
                this._routers.system.put(options.path, this.bodyParse, stack);
                break;
            case 'DELETE':
                this._routers.system.delete(options.path, stack);
                break;
            case 'OPTIONS':
                this._routers.system.options(options.path, stack);
                break;
            default:
                throw new Error('Unsupported HTTP method');

        }
    }
    /**
     * Add a handler to handle system interactions
     */
    public addToResources(options: HandlerOptions, ...handlers: Array<RequestHandler>): void {

        // prepare a stack
        let stack: HookableModels.ArgumentableAll<Request, Response> = this.prepareStack(options, handlers);

        // correct path
        options.path = '/:resource' + options.path;

        // prepare and add stack to router
        switch (options.httpmethod) {
            case 'GET':
                this._routers.resource.get(options.path, stack);
                break;
            case 'POST':
                this._routers.resource.post(options.path, this.bodyParse, stack);
                break;
            case 'PUT':
                this._routers.resource.put(options.path, this.bodyParse, stack);
                break;
            case 'DELETE':
                this._routers.resource.delete(options.path, stack);
                break;
            case 'OPTIONS':
                this._routers.resource.options(options.path, stack);
                break;
            default:
                throw new Error('Unsupported HTTP method');

        }
    }
    /**
     * prepare stack of handlers to be added to routing
     */
    private prepareStack(options: HandlerOptions, handlers: Array<RequestHandler>): HookableModels.ArgumentableAll<Request, Response> {

        // prepare a stack
        let stack: HookableModels.ArgumentableAll<Request, Response> = HookableComponent.argumentableAll();

        // bind hookables
        stack.pre = this.preHandlers.actor;
        stack.post = this.postHandlers.actor;

        // protected then check it
        if (options.protected === true) {
            stack.actor.push(this.isAuthenticated);
        }

        // push actual handler handler
        Array.prototype.push.apply(stack.actor, handlers);

        // return the stack
        return stack;
    }
    /**
     * Check that a user is actually authenticated
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run
     * @return {void} 
     */
    private isAuthenticated(req: Request, res: Response, next: HookableModels.ArgumentableCb): void {

        // check if user is set
        if (req.user === undefined) {

            // do some return of an error with next(error)
        } else {
            next();
        }
    }
}

