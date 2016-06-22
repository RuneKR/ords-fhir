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
var Instance = (function () {
    /**
     * Binding the routes their function
     */
    function Instance() {
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
        this.rc.get(':id', options, this.read.bind(this));
        this.rc.delete(':id', options, this.delete.bind(this));
        // do body parsing here
        options.middleware.parsers.body = true;
        this.rc.put(':id', options, this.update.bind(this));
    }
    /**
     * Read a specific instance of an resource
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    Instance.prototype.read = function (req, res, next) {
        // prepare options for the db action
        req.query._count = 1;
        // do database stuff
        this.dc.read(req, res).then(function () {
            // if meta data is specified then use that in return
            if (res.result[0].meta) {
                // set response headers of version
                if (res.result[0].meta.versionId) {
                    res.set({
                        'ETag': 'W/"' + res.result[0].meta.versionId + '"'
                    });
                }
                // set response headers of last updated
                if (res.result[0].meta.lastUpdated) {
                    res.set({
                        'Last-Modified': res.result[0].meta.lastUpdated
                    });
                }
            }
            // send resulting doc back
            next();
            // error has allready been populated res object so just go next
        }).catch(function () {
            next();
        });
    };
    /**
     * Update a specific instance of an resource
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    Instance.prototype.update = function (req, res, next) {
        // check if id is set for update and do not match with params.id 
        if (req.body.id !== undefined && req.params.id !== req.body.id) {
            var err = {
                httpcode: 400, issue: {
                    code: 'invalid.invariant',
                    diagnostics: 'id field cannot be changed',
                    severity: 'fatal'
                }
            };
            var code = err.httpcode;
            res.status(code);
            res.result = err;
            return next();
        }
        // do update
        this.dc.update(req, res).then(function () {
            // if meta data is specified then use that in return
            if (res.result.meta) {
                // set response headers
                if (res.result.meta.versionId) {
                    // set response headers of last updated
                    res.set({
                        'ETag': 'W/"' + res.result.meta.versionId + '"'
                    });
                    // an insert has occurred report if so
                    if (res.result.meta.versionId === 0) {
                        res.set({
                            'Location': '/' + req.params.resource + '/' + req.params.id
                        });
                        res.status(201);
                    }
                }
                // set header for last modified
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
    /**
     * Delete a specific instance of an resource
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    Instance.prototype.delete = function (req, res, next) {
        // do delete and then go next
        this.dc.delete(req, res).then(function () {
            next();
            // error has allready been populated res object so just go next
        }).catch(function () {
            next();
        });
    };
    __decorate([
        dependency_injector_1.DependencyInjectorComponent.inject(database_1.DatabaseComponent)
    ], Instance.prototype, "dc", void 0);
    __decorate([
        dependency_injector_1.DependencyInjectorComponent.inject(routing_1.RoutingComponent)
    ], Instance.prototype, "rc", void 0);
    return Instance;
}());
exports.Instance = Instance;
