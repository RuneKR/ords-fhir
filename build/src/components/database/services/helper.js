"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var database_middleware_1 = require('../database.middleware');
var dependency_injector_1 = require('../../dependency-injector');
/**
 * Validation routes
 */
var Helper = (function () {
    /**
     * add the correct methods to middlewares
     */
    function Helper(mw) {
        // add to input filters
        mw.filters.input.create.push(this.validateResource);
        mw.filters.input.update.push(this.validateResource);
        mw.filters.input.patch.push(this.validateResourcePartly);
    }
    /**
     * Validate that required fields are in req.body and all the fields in there exist in the resource
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {void}
     */
    Helper.prototype.validateResource = function (req, res, next) {
        //validate the resource contet
        return next();
    };
    /**
     * Only validate that all the fields in req.body exist in the resource
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {void}
     */
    Helper.prototype.validateResourcePartly = function (req, res, next) {
        //validate the resource contet
        return next();
    };
    Helper = __decorate([
        dependency_injector_1.DependencyInjectorComponent.createWith(database_middleware_1.DatabaseMiddleware)
    ], Helper);
    return Helper;
}());
exports.Helper = Helper;
