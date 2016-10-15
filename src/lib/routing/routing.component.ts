// external
import * as parser                          from 'body-parser';
import {Router}                             from 'express';
import {HookableComponent, HookableModels}  from 'make-it-hookable';
import {Component}                          from 'di-type';

// internal
import {ConformanceComponent}               from '../conformance';

// within
import {RoutingConfig}                      from './routing.config';
import {RouterContainer}                    from './models/router-container';
import {HandlerOptions}                     from './models/handler-options';
import {RequestHandler}                     from './models/request-handler';
import {Request}                            from './models/request';
import {Response}                           from './models/response';

@Component({
    directives: [RoutingConfig, ConformanceComponent],
    providers: []
})
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
     * Reference to express application instances
     * Should only be used directly by the routing component
     */
    public _routers: RouterContainer = {
        resource: Router(),
        system: Router()
    };
    /**
     * Reference to instance of conformance
     */
    private _cinstance:  ConformanceComponent;
    /**
     * Start up and listen for incomming traffic
     */
    constructor(constants: RoutingConfig, cinstance: ConformanceComponent) {

        // bind handler
        this._cinstance = cinstance;

        // bind pre handlers
        this.preHandlers.actor.push(this.authenticate);

        // parse body application/x-www-form-urlencoded
        this.bodyParse.actor.push(parser.urlencoded({
            extended: false,
            limit: process.env.LIMIT_UPLOAD_MB ? constants.LIMIT_UPLOAD_MB + 'mb' : 0.1 + 'mb'
        }));

        // parse application/json
        this.bodyParse.actor.push(parser.json({
            limit: process.env.LIMIT_UPLOAD_MB ? constants.LIMIT_UPLOAD_MB + 'mb' : 0.1 + 'mb'
        }));

        // remember resource check
        this._routers.resource.use(this.isResource);
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
    /**
     * Get information about the requested resource from the request params
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void} 
     */
    private isResource(req: Request, res: Response, next: HookableModels.ArgumentableCb): void {

        // grap info about the current route
        let model: any = this._cinstance[req.params.resource];

        // how to send back error?

        // set reference to that
        delete req.params.resource;

        // bind model to request
        req.resource = model;

        // go next
        next();
    }
}
