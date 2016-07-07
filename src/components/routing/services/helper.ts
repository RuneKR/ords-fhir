import {RouteOptions, RequestHandler, Request, Response, NextFunction}  from '../routing.models';
import {HookableComponent, HookableModels}                              from '../../hookable';
import {AuthComponent}                                                  from '../../auth';
import * as parser                                                      from 'body-parser';

/**
 * ORDS middleware for routes
 */
export class Helper {
    /**
     * Parse the body content of a request
     */
    public parseBody: HookableModels.Actor<Request, Response>;
    /**
     * Do the route
     */
    public doRoute: HookableModels.All<Request, Response>;
    /**
     * Reference to auth component
     */
    protected ac: AuthComponent;
    /**
     * Create a new instance of routes middleware handler
     */
    constructor(hc: HookableComponent, ac: AuthComponent) {

        // prepare body parsing layer
        this.parseBody = hc.oneLayer();

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
    /**
     * Adds middlware based to a handler for all resource 
     * @param  {RouteOptions}         options        options for the specific handler
     * @param  {RequestHandler}       handler        the route handler
     * @param  {string | undefined}   rsource        resource where handler is attached
     * @return {Array<RequestHandler>}          middleware along with the handler 
     */
    protected createStack(options: RouteOptions, handler: RequestHandler): Array<RequestHandler> {

        // pepare handlers that the request parses through
        let handlers: Array<RequestHandler> = [];

        // if route is a resource route validate that the resource exist on requests
        if (options.isResource === true) {
            handlers.push(this.parseResourceInfo.bind(this));
        }

        // parse information about the user performing the request
        Array.prototype.push.apply(handlers, this.ac.getUser);

        // if bodyparse is needed 
        if (options.parseBody === true) {
            Array.prototype.push.apply(handlers, this.parseBody.actor);
        }

        // if protected then validate requestion for authenticated
        if (options.protected === true) {
            handlers.push(this.isAuthenticated);
        }

        // do pre routes
        Array.prototype.push.apply(handlers, this.doRoute.pre);

        // add the route in the end
        handlers.push(handler);

        // do post routes
        Array.prototype.push.apply(handlers, this.doRoute.post);

        // the response back handler
        handlers.push(this.sendResponse);

        // send back result
        return handlers;
    }
    /**
     * Parese information about the resource to the request
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void} 
     */
    private parseResourceInfo(req: Request, res: Response, next: NextFunction): void {

        // grap info about the current route
        let model: any = this.rc.getResource(req.params.resource);

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
     * Validate that a user is authenticated
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void} 
     */
    private isAuthenticated(req: Request, res: Response, next: NextFunction): void {

        // grap info about the current route
        if (req.user === undefined) {

            // throw some error
        }

        // go next
        next();
    }
    /**
     * Last middlware to run that sends back the response to a client
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void} 
     */
    private sendResponse(req: Request, res: Response, next: NextFunction): void {

        // send back results of operations
        let result: any = res.result;
        delete res.result;

        res.send(result);
    }
}
