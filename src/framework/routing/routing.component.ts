import {HandlerOptions}                     from './models/handlerOptions';
import {Router}                             from './models/Router';
import {RequestHandler}                     from './models/RequestHandler';
import {RoutingHelper}                      from './models/routing.helper'
import {HookableComponent, HookableModels}  from '../../lib/hookable';
import {Request, Response}                  from 'express';
import * as parser                          from 'body-parser';
import * as cors                            from 'cors';

export class RoutingComponent {
    /**
     * Exectued before all handlers
     */
    public preHandler: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Parse the HTTP body of the request
     */
    public bodyParse: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Exectued after all handlers
     */
    public postHandler: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Reference to express application instance
     */
    private systemRouter: Router = Router();
    /**
     * Reference to express application instance
     */
    private resourceRouter: Router = Router();
    /**
     * Add a handler to handle system interactions
     */
    public addToSystem(options: HandlerOptions, handler: RequestHandler): void {

        // prepare a stack
        let stack: HookableModels.ArgumentableAll<Request, Response> = HookableComponent.argumentableAll();

        // bind hookables
        stack.pre = this.preHandler.pre;
        stack.post = this.postHandler.post;

        // push actual handler handler
        stack.actor.push(handler);

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
     * Add a handler to handle resource interactions
     */
    public addToResources(options: HandlerOptions, handler: RequestHandler): void {

        // prepare a stack
        let stack: HookableModels.ArgumentableAll<Request, Response> = HookableComponent.argumentableAll();

        // bind hookables
        stack.pre = this.preHandler.pre;
        stack.post = this.postHandler.post;

        // push actual handler handler
        stack.actor.push(handler);

        // set correct path
        options.path = '/:resource' + options.path;

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
     * Binds default functions to router and create a new instance
     */
    constructor() {

        // cors
        this.addCors(this.resourceRouter);
        this.addCors(this.systemRouter);

        // bind default resource parsing
        this.resourceRouter.use(this.getResourceFromParams);

        // bind auth parsing
        this.resourceRouter.use(this.getUserFromRequest);
        this.systemRouter.use(this.getUserFromRequest);

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
     * Get information about the requested resource from the request params
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void} 
     */
    private getResourceFromParams(req: Request, res: Response, next: NextFunction): void {

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
    /**
     * Get information about the user performing a request
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void} 
     */
    private getUserFromRequest(req: Request, res: Response, next: NextFunction): void {

        // get information about the user
        this.ac.getUser(req).then((user: any) => {

            // bind found user
            req.user = user;

            // go next
            next();
        });

    }
    private addCors(router: any): void {

        // calculate whitelist array and set as empty is not specified
        if (process.env.WHITELIST === undefined) {
            process.env.WHITELIST = '';
        }
        let whitelist: Array<string> = process.env.WHITELIST;

        // setup the usage of the whitelist
        router.use(cors({
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Authentication'],
            credentials: true,
            origin: function (origin: string, callback: Function): void {
                callback(undefined, whitelist.indexOf(origin) !== -1);
            }
        }));
    }
}

