import { RouteOptions } from './models/RouteOptions';
import { Helper } from './services/Helper';
import { Router } from './models/Router';
import { RequestHandler } from './models/RequestHandler';
/**
 * Main ORDS application
 */
export declare class RoutingComponent {
    /**
     * Main express application
     */
    router: Router;
    /**
     * Reference to helper
     */
    private helper;
    /**
     * Start the controller and add routes
     * @returns {void}
     */
    constructor(helper: Helper);
    /**
     * Adding an handler for a GET HTTP method for all resources
     * @param   {string}         path      path being added to the router
     * @param   {RouteOptions}   options   options for that given path
     * @param   {RequestHandler} handler   fuction handling request on that path
     * @returns {void}
     */
    get(path: string, options: RouteOptions, handler: RequestHandler): void;
    /**
     * Adding an handler for a GET OPTIONS method for all resources
     * @param   {string}         path      path being added to the router
     * @param   {RouteOptions}   options   options for that given path
     * @param   {RequestHandler} handler   fuction handling request on that path
     * @returns {void}
     */
    options(path: string, options: RouteOptions, handler: RequestHandler): void;
    /**
     * Adding an handler for a POST HTTP method for all resources
     * @param   {string}         path      path being added to the router
     * @param   {RouteOptions}   options   options for that given path
     * @param   {RequestHandler} handler   fuction handling request on that path
     * @returns {void}
     */
    post(path: string, options: RouteOptions, handler: RequestHandler): void;
    /**
     * Adding an handler for a PUT HTTP method for all resources
     * @param   {string}         path      path being added to the router
     * @param   {RouteOptions}   options   options for that given path
     * @param   {RequestHandler} handler   fuction handling request on that path
     * @returns {void}
     */
    put(path: string, options: RouteOptions, handler: RequestHandler): void;
    /**
     * Adding an handler for a DELETE HTTP method for all resources
     * @param   {string}         path      path being added to the router
     * @param   {RouteOptions}   options   options for that given path
     * @param   {RequestHandler} handler   fuction handling request on that path
     * @returns {void}
     */
    delete(path: string, options: RouteOptions, handler: RequestHandler): void;
    /**
     * Adding an handler for a PATCH HTTP method for all resources
     * @param   {string}         path      path being added to the router
     * @param   {RouteOptions}   options   options for that given path
     * @param   {RequestHandler} handler   fuction handling request on that path
     * @returns {void}
     */
    patch(path: string, options: RouteOptions, handler: RequestHandler): void;
}
