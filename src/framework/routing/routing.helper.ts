import {RouteOptions, RequestHandler, NextFunction}     from './routing.models';
import {HookableComponent, HookableModels}              from '../../lib/hookable';
import {AuthComponent}                                  from '../auth';
import {ConformanceComponent}                           from '../conformance';
import * as parser                                      from 'body-parser';
import * as cors                                        from 'cors';
import {Request, Response}                              from 'express';

/**
 * ORDS middleware for routes
 */
export class RoutingHelper {
    /**
     * Parse the body content of a request
     */
    public parseBody: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Called by the router to do the actuall route
     */
    public doRoute: HookableModels.ArgumentableAll<Request, Response> = HookableComponent.argumentableAll();
    /**
     * Reference to auth component
     */
    private ac: AuthComponent;
    /**
     * Reference to conformance component
     */
    private cc: ConformanceComponent;
    /**
     * Create a new instance of routes middleware handler
     */
    constructor(ac: AuthComponent, cc: ConformanceComponent) {

        // bind references
        this.ac = ac;
        this.cc = cc;

        // parse body application/x-www-form-urlencoded
        this.parseBody.actor.push(parser.urlencoded({
            extended: false,
            limit: process.env.LIMIT_UPLOAD_MB ? process.env.LIMIT_UPLOAD_MB + 'mb' : 0.1 + 'mb'
        }));

        // parse application/json
        this.parseBody.actor.push(parser.json({
            limit: process.env.LIMIT_UPLOAD_MB ? process.env.LIMIT_UPLOAD_MB + 'mb' : 0.1 + 'mb'
        }));


    }
    protected addCors(router: any): void {

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
    /**
     * Adds middlware based to a handler for all resource 
     * @param  {RouteOptions}         options        options for the specific handler
     * @param  {RequestHandler}       handler        the route handler
     * @param  {string | undefined}   rsource        resource where handler is attached
     * @return {Array<RequestHandler>}               middleware along with the handler 
     */
    protected createStack(options: RouteOptions, handler: RequestHandler): Array<RequestHandler> {

        // prepare a stack
        let stack: HookableModels.ArgumentableAll<Request, Response> = HookableComponent.argumentableAll();
        stack.pre = this.doRoute.pre;
        stack.post = this.doRoute.post;
        stack.actor.push(handler);

        // pepare handlers that the request parses through
        let handlers: Array<RequestHandler> = [];

        // if protected then validate requestion for authenticated
        if (options.protected === true) {
            handlers.push(this.isAuthenticated);
        }

        // if bodyparse is needed
        if (options.parseBody === true) {
            Array.prototype.push.apply(handlers, this.parseBody);
        }

        // the stack that is to be run
        handlers.push(stack);

        // send back result
        return handlers;
    }
    /**
     * Get information about the requested resource from the request params
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void} 
     */
    protected getResourceFromParams(req: Request, res: Response, next: NextFunction): void {

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
    protected getUserFromRequest(req: Request, res: Response, next: NextFunction): void {

        // get information about the user
        this.ac.getUser(req).then((user: any) => {

            // bind found user
            req.user = user;

            // go next
            next();
        });

    }
    /**
     * Validate that a user is authenticated or block the request
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void} 
     */
    private isAuthenticated(req: Request, res: Response, next: NextFunction): void {

        // grap info about the current route
        if (req.user === undefined) {

            // throw some error in the next
            next();
        } else {

            // no errors so go next
            next();
        }
    }
}
