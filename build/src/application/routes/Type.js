"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var routing_1 = require('../../components/routing');
var database_1 = require('../../components/database');
var dependency_injector_1 = require('../../components/dependency-injector');
/**
 * HL7 FHIR instance interactions
 */
var Type = (function () {
    /**
     * Binding the routes their function
     */
    function Type() {
        // options for added routes
        var options = {
            isResource: true,
            middleware: {
                parsers: {
                    user: true
                }
            },
            protected: true
        };
        // bind model to router
        this.rc.get('', options, this.search.bind(this));
        // do body parsing here
        options.middleware.parsers.body = true;
        this.rc.post('_search', options, this.search_body.bind(this));
        this.rc.post('', options, this.create.bind(this));
    }
    /**
     * Search a resource
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    Type.prototype.search = function (req, res, next) {
        // prepare options for the db action
        if (req.query._count === undefined) {
            req.query._count = 30;
        }
        // do database stuff
        this.dc.read(req, res).then(function () {
            // send resulting doc back
            next();
            // error has allready been populated res object so just go next
        }).catch(function () {
            next();
        });
    };
    /**
     * Search a resource when query is in body
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    Type.prototype.search_body = function (req, res, next) {
        // prepare options for the db action
        if (req.query._count === undefined) {
            req.query._count = 30;
        }
        // move all from body to query in req object
        var keys = Object.keys(req.body);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            req.query[key] = req.body[key];
            delete req.body[key];
        }
        // do database stuff
        this.dc.read(req, res).then(function () {
            // send resulting doc back
            next();
            // error has allready been populated res object so just go next
        }).catch(function () {
            next();
        });
    };
    /**
     * Create a new resource
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    Type.prototype.create = function (req, res, next) {
        // do database stuff
        this.dc.create(req, res).then(function () {
            // if meta data is specified then use that in return
            if (res.result.meta) {
                // set response headers
                if (res.result.meta.versionId) {
                    res.set({
                        'ETag': 'W/"' + res.result.meta.versionId + '"'
                    });
                    // an insert has occured
                    if (res.result.meta.versionId === 0) {
                        res.set({
                            'Location': '/' + req.resource.name + '/' + req.params.id
                        });
                        res.status(201);
                    }
                }
                if (res.result.meta.lastUpdated) {
                    res.set({
                        'Last-Modified': res.result.meta.lastUpdated
                    });
                }
            }
            // go next
            next();
            // error has allready been populated res object so just go next
        }).catch(function () {
            next();
        });
    };
    __decorate([
        dependency_injector_1.DependencyInjectorComponent.inject(database_1.DatabaseComponent)
    ], Type.prototype, "dc", void 0);
    __decorate([
        dependency_injector_1.DependencyInjectorComponent.inject(routing_1.RoutingComponent)
    ], Type.prototype, "rc", void 0);
    return Type;
}());
exports.Type = Type;
