"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var conformance_1 = require('../../conformance');
var routing_middleware_1 = require('../routing.middleware');
var dependency_injector_1 = require('../../dependency-injector');
var parser = require('body-parser');
/**
 * ORDS middleware for routes
 */
var Helper = (function () {
    /**
     * Create a new instance of routes middleware handler and adds default middleware
     */
    function Helper(rc, rm) {
        // bind the two injected
        this.rc = rc;
        this.rm = rm;
        // parse body application/x-www-form-urlencoded
        this.rm.parsers.body.push(parser.urlencoded({
            extended: false,
            limit: process.env.LIMIT_UPLOAD_MB ? process.env.LIMIT_UPLOAD_MB + 'mb' : 0.1 + 'mb'
        }));
        // parse application/json
        this.rm.parsers.body.push(parser.json({
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
    Helper.prototype.createStack = function (options, handler) {
        // pepare handlers that the request parses through
        var handlers = [];
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
    };
    /**
     * Parese information about the resource to the request
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void}
     */
    Helper.prototype.parseResourceInfo = function (req, res, next) {
        // grap info about the current route
        var model = this.rc.getResource(req.params.resource);
        // check that resource actually exists
        if (model === undefined) {
        }
        delete req.params.resource;
        // set reference to that
        req.resource = model;
        // go next
        next();
    };
    /**
     * Validate that a user is authenticated
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void}
     */
    Helper.prototype.isAuthenticated = function (req, res, next) {
        // grap info about the current route
        if (req.user === undefined) {
        }
        // go next
        next();
    };
    /**
     * Last middlware to run that sends back the response to a client
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void}
     */
    Helper.prototype.sendResponse = function (req, res, next) {
        // send back results of operations
        var result = res.result;
        delete res.result;
        res.send(result);
    };
    Helper = __decorate([
        dependency_injector_1.DependencyInjectorComponent.createWith(conformance_1.ConformanceComponent, routing_middleware_1.RoutingMiddleware)
    ], Helper);
    return Helper;
}());
exports.Helper = Helper;
