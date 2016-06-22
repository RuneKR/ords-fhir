"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var routing_1 = require('../../routing');
var conformance_1 = require('../../conformance');
var core_1 = require('../../core');
/**
 * HL7 FHIR instance interactions
 */
var System = (function () {
    /**
     * Binding the routes their function
     */
    function System() {
        // options for added routes
        var options = {
            isResource: false,
            middleware: {
                parsers: {
                    body: false,
                    user: false
                }
            },
            protected: false
        };
        // bind to router
        this.rm.get('metadata', options, this.displayConStatement.bind(this));
        this.rm.options('', options, this.displayConStatement.bind(this));
        this.rm.post('StructureDefinition/:resource', options, this.displayStructureDef.bind(this));
        this.rm.post('Valueset/:resource', options, this.displayValueset.bind(this));
    }
    /**
     * Display a valueset
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    System.prototype.displayValueset = function (req, res, next) {
        if (this.rsc.getValueset(req.params.resource) === undefined) {
            var err = {
                httpcode: 404,
                issue: {
                    code: 'processing.not-found',
                    severity: 'warning'
                }
            };
            var code = err.httpcode;
            res.status(code).send(err);
        }
        else {
            var structuredef = this.rsc.getValueset(req.params.resource);
            // set meta if needed
            if (structuredef.meta) {
                // set response headers of version
                if (structuredef.meta.versionId) {
                    res.set({
                        'ETag': 'W/"' + structuredef.meta.versionId + '"'
                    });
                }
                // set response headers of last updated
                if (structuredef.meta.lastUpdated) {
                    res.set({
                        'Last-Modified': structuredef.meta.lastUpdated
                    });
                }
            }
            // send it back
            res.result(structuredef);
            next();
        }
    };
    /**
     * Display a specific structure def
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    System.prototype.displayStructureDef = function (req, res, next) {
        if (this.rsc.getResource(req.params.resource, true) === undefined) {
            var err = {
                httpcode: 404,
                issue: {
                    code: 'processing.not-found',
                    severity: 'warning'
                }
            };
            var code = err.httpcode;
            res.status(code).send(err);
        }
        else {
            // temp ref
            var structuredef = this.rsc.getResource(req.params.resource, true);
            // set meta if needed
            if (structuredef.meta) {
                // set response headers of version
                if (structuredef.meta.versionId) {
                    res.set({
                        'ETag': 'W/"' + structuredef.meta.versionId + '"'
                    });
                }
                // set response headers of last updated
                if (structuredef.meta.lastUpdated) {
                    res.set({
                        'Last-Modified': structuredef.meta.lastUpdated
                    });
                }
            }
            // send it back
            res.result(structuredef);
            next();
        }
    };
    /**
     * Display the conformance statement
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    System.prototype.displayConStatement = function (req, res, next) {
        // set meta if needed
        if (this.rsc.conformance.meta) {
            // set response headers of version
            if (this.rsc.conformance.meta.versionId) {
                res.set({
                    'ETag': 'W/"' + this.rsc.conformance.meta.versionId + '"'
                });
            }
            // set response headers of last updated
            if (this.rsc.conformance.meta.lastUpdated) {
                res.set({
                    'Last-Modified': this.rsc.conformance.meta.lastUpdated
                });
            }
        }
        res.result = this.rsc.conformance;
        next();
    };
    __decorate([
        core_1.Inject(conformance_1.Component)
    ], System.prototype, "rsc", void 0);
    __decorate([
        core_1.Inject(routing_1.Component)
    ], System.prototype, "rm", void 0);
    return System;
}());
exports.System = System;
