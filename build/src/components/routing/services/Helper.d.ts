import { ConformanceComponent } from '../../conformance';
import { RoutingMiddleware } from '../routing.middleware';
import { RouteOptions, RequestHandler } from '../../routing/routing.models';
/**
 * ORDS middleware for routes
 */
export declare class Helper {
    /**
     * Reference to conformance
     */
    private rc;
    /**
     * Reference to route middleware
     */
    private rm;
    /**
     * Create a new instance of routes middleware handler and adds default middleware
     */
    constructor(rc: ConformanceComponent, rm: RoutingMiddleware);
    /**
     * Adds middlware based to a handler for all resource
     * @param  {RouteOptions}         options        options for the specific handler
     * @param  {RequestHandler}       handler        the route handler
     * @param  {string | undefined}   rsource        resource where handler is attached
     * @return {Array<RequestHandler>}          middleware along with the handler
     */
    createStack(options: RouteOptions, handler: RequestHandler): Array<RequestHandler>;
    /**
     * Parese information about the resource to the request
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void}
     */
    private parseResourceInfo(req, res, next);
    /**
     * Validate that a user is authenticated
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void}
     */
    private isAuthenticated(req, res, next);
    /**
     * Last middlware to run that sends back the response to a client
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void}
     */
    private sendResponse(req, res, next);
}
