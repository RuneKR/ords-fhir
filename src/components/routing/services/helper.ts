import {ConformanceComponent}                                           from '../../conformance';
import {RoutingMiddleware}                                              from '../routing.middleware';
import {DependencyInjectorComponent}                                    from '../../dependency-injector';
import {RouteOptions, RequestHandler, Request, Response, NextFunction}  from '../../routing/routing.models';

/**
 * ORDS middleware for routes
 */
@DependencyInjectorComponent.createWith(ConformanceComponent, RoutingMiddleware)
export class Helper {
    /**
     * Reference to conformance
     */
    private rc: ConformanceComponent;
    /**
     * Reference to route middleware
     */
    private rm: RoutingMiddleware;
    /**
     * Create a new instance of routes middleware handler
     */
    constructor(rc: ConformanceComponent, rm: RoutingMiddleware) {

        // bind the two injected
        this.rc = rc;
        this.rm = rm;
        
    }
    /**
     * Adds middlware based to a handler for all resource 
     * @param  {RouteOptions}         options        options for the specific handler
     * @param  {RequestHandler}       handler        the route handler
     * @param  {string | undefined}   rsource        resource where handler is attached
     * @return {Array<RequestHandler>}          middleware along with the handler 
     */
    public createStack(options: RouteOptions, handler: RequestHandler): Array<RequestHandler> {

        // pepare handlers that the request parses through
        let handlers: Array<RequestHandler> = [];

        // if route is a resource route validate that the resource exist on requests
        if (options.isResource === true) {
            handlers.push(this.parseResourceInfo.bind(this));
        }

        // if projected then these handlers are needed
        if (options.middleware.parsers.user === true || options.protected === true) {
            Array.prototype.push.apply(handlers, this.rm.parsers.user);
        }

        // if bodyparse is needed 
        if (options.middleware.parsers.body === true) {
            Array.prototype.push.apply(handlers, this.rm.parsers.body);
        }

        // if protected then validate requestion for authenticated
        if (options.protected === true) {
            handlers.push(this.isAuthenticated);
        }

        // logger for input
        Array.prototype.push.apply(handlers, this.rm.loggers.input);

        // add the route in the end
        handlers.push(handler);

        // logger for output
        Array.prototype.push.apply(handlers, this.rm.loggers.output);

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
