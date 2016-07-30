import {HandlerOptions, RequestHandler}     from './application.models';
import {Router}                             from 'express';
import {HookableComponent, HookableModels}  from 'make-it-hookable';
import {Request, Response}                  from './shared/models/client-interaction';
import * as parser                          from 'body-parser';
import * as cors                            from 'cors';
import {DependencyInjectorComponent}        from 'di-type';
import {AuthComponent}                      from './lib/auth';
import {ConformanceComponent}               from './lib/conformance';

@DependencyInjectorComponent.createWith(AuthComponent, ConformanceComponent)
export class ApplicationRouting {
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
    private systemRouter: Router = Router();
    /**
     * Reference to express application instance
     * Use on OWN risk inteded visible for the Application class only
     */
    private resourceRouter: Router = Router();
    /**
     * Refernece to injected authcomponent
     */
    private ac: AuthComponent;
    /**
     * Refernece to injected cnformancecomponent
     */
    private cc: ConformanceComponent;
    /**
     * Binds default functions to pre stack
     */
    constructor(ac: AuthComponent, cc: ConformanceComponent) {

        // bind references
        this.ac = ac;
        this.cc = cc;

        // calculate whitelist array and set as empty is not specified
        if (process.env.WHITELIST === undefined) {
            process.env.WHITELIST = '';
        }
        let whitelist: Array<string> = process.env.WHITELIST;

        // setup the usage of the whitelist
        this.preHandlers.actor.push(cors({
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Authentication'],
            credentials: true,
            origin: function (origin: string, callback: Function): void {
                callback(undefined, whitelist.indexOf(origin) !== -1);
            }
        }));

        // bind auth parsing
        this.preHandlers.actor.push(this.authenticate);

        // parse body application/x-www-form-urlencoded
        this.bodyParse.actor.push(parser.urlencoded({
            extended: false,
            limit: process.env.LIMIT_UPLOAD_MB ? process.env.LIMIT_UPLOAD_MB + 'mb' : 0.1 + 'mb'
        }));

        // parse application/json
        this.bodyParse.actor.push(parser.json({
            limit: process.env.LIMIT_UPLOAD_MB ? process.env.LIMIT_UPLOAD_MB + 'mb' : 0.1 + 'mb'
        }));

    }
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
                this.systemRouter.get(options.path, stack);
                break;
            case 'POST':
                this.systemRouter.post(options.path, this.bodyParse, stack);
                break;
            case 'PUT':
                this.systemRouter.put(options.path, this.bodyParse, stack);
                break;
            case 'DELETE':
                this.systemRouter.delete(options.path, stack);
                break;
            case 'OPTIONS':
                this.systemRouter.options(options.path, stack);
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
                this.resourceRouter.get(options.path, stack);
                break;
            case 'POST':
                this.resourceRouter.post(options.path, this.bodyParse, stack);
                break;
            case 'PUT':
                this.resourceRouter.put(options.path, this.bodyParse, stack);
                break;
            case 'DELETE':
                this.resourceRouter.delete(options.path, stack);
                break;
            case 'OPTIONS':
                this.resourceRouter.options(options.path, stack);
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

