"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var express = require('express');
var routing_1 = require('../components/routing');
var dependency_injector_1 = require('../components/dependency-injector');
// routes to be bootstrapped
var Instance_1 = require('./routes/Instance');
var Type_1 = require('./routes/Type');
var System_1 = require('./routes/System');
/**
 * Main ORDS FHIR application
 */
var Application = (function () {
    /**
     * Start the router to listen on incomming traffic
     * @param   {Options}     options     the options specificing how to listen
     * @returns {void}
     */
    function Application(options) {
        /**
         * Instanciated routes
         */
        this.routes = [];
        // set included routes
        this.routes.push(new System_1.System(), new Instance_1.Instance(), new Type_1.Type());
        // init instance of router
        this.router = express();
        // bind app from route manager
        this.router.use(options.prefix, this.rc.router);
        // start to listen for input
        this.router.listen(options.port);
    }
    __decorate([
        dependency_injector_1.DependencyInjectorComponent.inject(routing_1.RoutingComponent)
    ], Application.prototype, "rc", void 0);
    return Application;
}());
exports.Application = Application;
