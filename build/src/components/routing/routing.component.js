"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Helper_1 = require('./services/Helper');
var cors = require('cors');
var Router_1 = require('./models/Router');
var dependency_injector_1 = require('../dependency-injector');
/**
 * Main ORDS application
 */
var RoutingComponent = (function () {
    /**
     * Start the controller and add routes
     * @returns {void}
     */
    function RoutingComponent(helper) {
        /**
         * Main express application
         */
        this.router = Router_1.Router();
        // save reference
        this.helper = helper;
        // calculate whitelist array and set as empty is not specified
        if (process.env.WHITELIST === undefined) {
            process.env.WHITELIST = '';
        }
        var whitelist = process.env.WHITELIST;
        // set the cors
        this.router.use(cors({
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Authentication'],
            credentials: true,
            origin: function (origin, callback) {
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
    RoutingComponent.prototype.get = function (path, options, handler) {
        // force body parse to false
        options.middleware.parsers.body = false;
        // create a stack of handlers for that path
        var handlers = this.helper.createStack(options, handler);
        // resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
        }
        else {
            handlers.unshift(path);
        }
        // apply to express router
        this.router.get.apply(this.router, handlers);
    };
    /**
     * Adding an handler for a GET OPTIONS method for all resources
     * @param   {string}         path      path being added to the router
     * @param   {RouteOptions}   options   options for that given path
     * @param   {RequestHandler} handler   fuction handling request on that path
     * @returns {void}
     */
    RoutingComponent.prototype.options = function (path, options, handler) {
        // force body parse to false
        options.middleware.parsers.body = false;
        // create a stack of handlers for that path
        var handlers = this.helper.createStack(options, handler);
        // resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
        }
        else {
            handlers.unshift(path);
        }
        // apply to express router
        this.router.options.apply(this.router, handlers);
    };
    /**
     * Adding an handler for a POST HTTP method for all resources
     * @param   {string}         path      path being added to the router
     * @param   {RouteOptions}   options   options for that given path
     * @param   {RequestHandler} handler   fuction handling request on that path
     * @returns {void}
     */
    RoutingComponent.prototype.post = function (path, options, handler) {
        // force body parse to true
        options.middleware.parsers.body = true;
        // create a stack of handlers for that path
        var handlers = this.helper.createStack(options, handler);
        // resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
        }
        else {
            handlers.unshift(path);
        }
        // apply to express router
        this.router.post.apply(this.router, handlers);
    };
    /**
     * Adding an handler for a PUT HTTP method for all resources
     * @param   {string}         path      path being added to the router
     * @param   {RouteOptions}   options   options for that given path
     * @param   {RequestHandler} handler   fuction handling request on that path
     * @returns {void}
     */
    RoutingComponent.prototype.put = function (path, options, handler) {
        // force body parse to true
        options.middleware.parsers.body = true;
        // create a stack of handlers for that path
        var handlers = this.helper.createStack(options, handler);
        // resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
        }
        else {
            handlers.unshift(path);
        }
        // apply to express router
        this.router.put.apply(this.router, handlers);
    };
    /**
     * Adding an handler for a DELETE HTTP method for all resources
     * @param   {string}         path      path being added to the router
     * @param   {RouteOptions}   options   options for that given path
     * @param   {RequestHandler} handler   fuction handling request on that path
     * @returns {void}
     */
    RoutingComponent.prototype.delete = function (path, options, handler) {
        // force body parse to true
        options.middleware.parsers.body = true;
        // create a stack of handlers for that path
        var handlers = this.helper.createStack(options, handler);
        // resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
        }
        else {
            handlers.unshift(path);
        }
        // apply to express router
        this.router.delete.apply(this.router, handlers);
    };
    /**
     * Adding an handler for a PATCH HTTP method for all resources
     * @param   {string}         path      path being added to the router
     * @param   {RouteOptions}   options   options for that given path
     * @param   {RequestHandler} handler   fuction handling request on that path
     * @returns {void}
     */
    RoutingComponent.prototype.patch = function (path, options, handler) {
        // force body parse to true
        options.middleware.parsers.body = true;
        // create a stack of handlers for that path
        var handlers = this.helper.createStack(options, handler);
        // resource or normal path
        if (options.isResource) {
            handlers.unshift('/:resource/' + path);
        }
        else {
            handlers.unshift(path);
        }
        // apply to express router
        this.router.patch.apply(this.router, handlers);
    };
    RoutingComponent = __decorate([
        dependency_injector_1.DependencyInjectorComponent.createWith(Helper_1.Helper)
    ], RoutingComponent);
    return RoutingComponent;
}());
exports.RoutingComponent = RoutingComponent;
