import {RouteOptions}                   from './models/RouteOptions';
import {Helper}                         from './services/Helper';
import * as cors                        from 'cors';
import {Router}                         from './models/Router';
import {RequestHandler}                 from './models/RequestHandler';
import {DependencyInjectorComponent}    from '../dependency-injector';

/**
 * Main ORDS application
 */
@DependencyInjectorComponent.createWith(Helper)
export class RoutingComponent {
    /**
     * Main express application
     */
    public router: Router = Router();
    /**
     * Reference to helper
     */
    private helper: Helper;
    /**
     * Start the controller and add routes
     * @returns {void}
     */
    constructor(helper: Helper) {

        // save reference
        this.helper = helper;

        // calculate whitelist array and set as empty is not specified
        if (process.env.WHITELIST === undefined) {
            process.env.WHITELIST = '';
        }
        let whitelist: Array<string> = process.env.WHITELIST;

        // set the cors
        this.router.use(cors({
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Authentication'],
            credentials: true,
            origin: function (origin: string, callback: Function): void {
                callback(undefined, whitelist.indexOf(origin) !== -1);
            }
        }));

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
        options.middleware.parsers.body = false;

        // create a stack of handlers for that path
        let handlers: Array<any> = this.helper.createStack(options, handler);

        // resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
        } else {
            handlers.unshift(path);
        }

        // apply to express router
        this.router.get.apply(this.router, handlers);
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
        options.middleware.parsers.body = false;

        // create a stack of handlers for that path
        let handlers: Array<any> = this.helper.createStack(options, handler);

        // resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
        } else {
            handlers.unshift(path);
        }

        // apply to express router
        this.router.options.apply(this.router, handlers);
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
        options.middleware.parsers.body = true;

        // create a stack of handlers for that path
        let handlers: Array<any> = this.helper.createStack(options, handler);
        // resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
        } else {
            handlers.unshift(path);
        }

        // apply to express router
        this.router.post.apply(this.router, handlers);
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
        options.middleware.parsers.body = true;

        // create a stack of handlers for that path
        let handlers: Array<any> = this.helper.createStack(options, handler);
        // resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
        } else {
            handlers.unshift(path);
        }

        // apply to express router
        this.router.put.apply(this.router, handlers);
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
        options.middleware.parsers.body = true;

        // create a stack of handlers for that path
        let handlers: Array<any> = this.helper.createStack(options, handler);
        // resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
        } else {
            handlers.unshift(path);
        }

        // apply to express router
        this.router.delete.apply(this.router, handlers);
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
        options.middleware.parsers.body = true;

        // create a stack of handlers for that path
        let handlers: Array<any> = this.helper.createStack(options, handler);
        // resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
        } else {
            handlers.unshift(path);
        }

        // apply to express router
        this.router.patch.apply(this.router, handlers);
    }
}
