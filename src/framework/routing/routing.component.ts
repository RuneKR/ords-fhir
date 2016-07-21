import {RouteOptions}                       from './models/RouteOptions';
import {Router}                             from './models/Router';
import {RequestHandler}                     from './models/RequestHandler';
import {DependencyInjectorComponent}        from '../../lib/dependency-injector';
import {AuthComponent}                      from '../auth';
import {ConformanceComponent}               from '../conformance';
import {RoutingHelper}                      from './routing.helper';

/**
 * Manage routes that are added
 */
@DependencyInjectorComponent.createWith(AuthComponent, ConformanceComponent)
export class RoutingComponent extends RoutingHelper {
    /**
     * Reference to express application instance
     */
    public resourceRouter: Router = Router();
    /**
     * Reference to express application instance
     */
    public systemRouter: Router = Router();
    /**
     * Start the controller and add routes
     * @returns {void}
     */
    constructor(ac: AuthComponent, cc: ConformanceComponent) {

        super(ac, cc);

        // add functionalities to be run on every request
        this.resourceRouter.use(this.addCors);
        this.resourceRouter.use(this.getResourceFromParams);
        this.resourceRouter.use(this.getUserFromRequest);

        this.systemRouter.use(this.addCors);
        this.systemRouter.use(this.getUserFromRequest);
    }
    /**
     * Adding an handler for a GET HTTP method for all resources
     * @param   {string}         path      path being added to the router
     * @param   {RouteOptions}   options   options for that given path
     * @param   {RequestHandler} handler   fuction handling request on that path
     * @returns {void}
     */
    public get(path: string, options: RouteOptions, handler: RequestHandler): void {

        // force body parse to false
        options.parseBody = false;

        // create a stack of handlers for that path
        let handlers: Array<any> = this.createStack(options, handler);

        // resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
            this.resourceRouter.get.apply(this.resourceRouter, handlers);
        } else {
            handlers.unshift(path);
            this.systemRouter.get.apply(this.systemRouter, handlers);
        }
    }
    /**
     * Adding an handler for a GET OPTIONS method for all resources
     * @param   {string}         path      path being added to the router
     * @param   {RouteOptions}   options   options for that given path
     * @param   {RequestHandler} handler   fuction handling request on that path
     * @returns {void}
     */
    public options(path: string, options: RouteOptions, handler: RequestHandler): void {

        // force body parse to false
        options.parseBody = false;

        // create a stack of handlers for that path
        let handlers: Array<any> = this.createStack(options, handler);

        /// resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
            this.resourceRouter.options.apply(this.resourceRouter, handlers);
        } else {
            handlers.unshift(path);
            this.systemRouter.options.apply(this.systemRouter, handlers);
        }
    }
    /**
     * Adding an handler for a POST HTTP method for all resources
     * @param   {string}         path      path being added to the router
     * @param   {RouteOptions}   options   options for that given path
     * @param   {RequestHandler} handler   fuction handling request on that path
     * @returns {void}
     */
    public post(path: string, options: RouteOptions, handler: RequestHandler): void {

        // force body parse to true
        options.parseBody = true;

        // create a stack of handlers for that path
        let handlers: Array<any> = this.createStack(options, handler);
        // resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
        } else {
            handlers.unshift(path);
        }

        // resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
            this.resourceRouter.post.apply(this.resourceRouter, handlers);
        } else {
            handlers.unshift(path);
            this.systemRouter.post.apply(this.systemRouter, handlers);
        }
    }
    /**
     * Adding an handler for a PUT HTTP method for all resources
     * @param   {string}         path      path being added to the router
     * @param   {RouteOptions}   options   options for that given path
     * @param   {RequestHandler} handler   fuction handling request on that path
     * @returns {void}
     */
    public put(path: string, options: RouteOptions, handler: RequestHandler): void {

        // force body parse to true
        options.parseBody = true;

        // create a stack of handlers for that path
        let handlers: Array<any> = this.createStack(options, handler);
        
        // resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
            this.resourceRouter.put.apply(this.resourceRouter, handlers);
        } else {
            handlers.unshift(path);
            this.systemRouter.put.apply(this.systemRouter, handlers);
        }
    }
    /**
     * Adding an handler for a DELETE HTTP method for all resources
     * @param   {string}         path      path being added to the router
     * @param   {RouteOptions}   options   options for that given path
     * @param   {RequestHandler} handler   fuction handling request on that path
     * @returns {void}
     */
    public delete(path: string, options: RouteOptions, handler: RequestHandler): void {

        // force body parse to true
        options.parseBody = true;

        // create a stack of handlers for that path
        let handlers: Array<any> = this.createStack(options, handler);
        
        // resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
            this.resourceRouter.delete.apply(this.resourceRouter, handlers);
        } else {
            handlers.unshift(path);
            this.systemRouter.delete.apply(this.systemRouter, handlers);
        }
    }
    /**
     * Adding an handler for a PATCH HTTP method for all resources
     * @param   {string}         path      path being added to the router
     * @param   {RouteOptions}   options   options for that given path
     * @param   {RequestHandler} handler   fuction handling request on that path
     * @returns {void}
     */
    public patch(path: string, options: RouteOptions, handler: RequestHandler): void {

        // force body parse to true
        options.parseBody = true;

        // create a stack of handlers for that path
        let handlers: Array<any> = this.createStack(options, handler);
        
        // resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
            this.resourceRouter.patch.apply(this.resourceRouter, handlers);
        } else {
            handlers.unshift(path);
            this.systemRouter.patch.apply(this.systemRouter, handlers);
        }
    }
}
