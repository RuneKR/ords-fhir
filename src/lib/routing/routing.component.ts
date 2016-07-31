import {HandlerOptions}                     from './models/handler-options';
import {RequestHandler}                     from './models/request-handler';
import {Router}                             from 'express';
import {HookableComponent, HookableModels}  from 'make-it-hookable';
import {Request, Response}                  from '../../shared/models/client-interaction';

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
     * Reference to express application instance
     * Use on OWN risk inteded visible for the Application class only
     */
    public _systemRouter: Router = Router();
    /**
     * Reference to express application instance
     * Use on OWN risk inteded visible for the Application class only
     */
    public _resourceRouter: Router = Router();
    /**
     * Add a handler to handle system interactions
     */
    public addToSystem(options: HandlerOptions, ...handlers: Array<RequestHandler>): void {

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

        // prepare and add stack to router
        switch (options.httpmethod) {
            case 'GET':
                this._systemRouter.get(options.path, stack);
                break;
            case 'POST':
                this._systemRouter.post(options.path, this.bodyParse, stack);
                break;
            case 'PUT':
                this._systemRouter.put(options.path, this.bodyParse, stack);
                break;
            case 'DELETE':
                this._systemRouter.delete(options.path, stack);
                break;
            case 'OPTIONS':
                this._systemRouter.options(options.path, stack);
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

        // prepare and add stack to router
        switch (options.httpmethod) {
            case 'GET':
                this._resourceRouter.get(options.path, this.getResourceFromParams, stack);
                break;
            case 'POST':
                this._resourceRouter.post(options.path, this.getResourceFromParams, this.bodyParse, stack);
                break;
            case 'PUT':
                this._resourceRouter.put(options.path, this.getResourceFromParams, this.bodyParse, stack);
                break;
            case 'DELETE':
                this._resourceRouter.delete(options.path, this.getResourceFromParams, stack);
                break;
            case 'OPTIONS':
                this._resourceRouter.options(options.path, this.getResourceFromParams, stack);
                break;
            default:
                throw new Error('Unsupported HTTP method');

        }
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
    /**
     * Get information about the user performing a request
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void} 
     */
    private authenticate(req: Request, res: Response, next: HookableModels.ArgumentableCb): void {

        // get information about the user
        this.ac.getUser(req).then((user: any) => {

            // bind found user
            req.user = user;

            // go next
            next();
        });
    }
    /**
     * Get information about the requested resource from the request params
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void} 
     */
    private getResourceFromParams(req: Request, res: Response, next: HookableModels.ArgumentableCb): void {

        // grap info about the current route
        let model: any = this.cc.getResource(req.params.resource);

        // check that resource actually exists
        if (model === undefined) {

            // throw some error
        }

        delete req.params.resource;

        // set reference to that
        req.resource = model;

        // go next
        next();
    }
}

