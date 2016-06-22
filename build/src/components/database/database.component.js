"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var es6_promise_1 = require('es6-promise');
var database_middleware_1 = require('./database.middleware');
var dependency_injector_1 = require('../dependency-injector');
/**
 * Handles connection to a database by doing all middlewares
 */
var DatabaseComponent = (function () {
    /**
     * Create new instance of DBManager and bind middleware to it
     */
    function DatabaseComponent(dbm) {
        // bind middleware
        this.dbm = dbm;
    }
    /**
     * Create something in the database
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {Promise}     send back response when all middleware has been run
     */
    DatabaseComponent.prototype.create = function (req, res) {
        var _this = this;
        // return promise about resolution of task
        return new es6_promise_1.Promise(function (resolve, reject) {
            // create stack that are being run
            var stack = [];
            Array.prototype.push.apply(stack, _this.dbm.filters.input.create);
            Array.prototype.push.apply(stack, _this.dbm.actors.create);
            Array.prototype.push.apply(stack, _this.dbm.filters.output.create);
            // run stack
            var next = function () {
                // check if any functions are left to run
                if (stack.length === 0) {
                    resolve();
                }
                // next function to run
                var func = stack.shift();
                // try to run through the whole stack
                try {
                    func(req, res, next);
                }
                catch (err) {
                    // perhaps catch runtime errors that did not set the correct operationoutcome?
                    reject();
                }
            };
            // start next
            next();
        });
    };
    /**
     * Read something from the database
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {Promise}     send back response when all middleware has been run
     */
    DatabaseComponent.prototype.read = function (req, res) {
        var _this = this;
        // return promise about resolution of task
        return new es6_promise_1.Promise(function (resolve, reject) {
            // create stack that are being run
            var stack = [];
            Array.prototype.push.apply(stack, _this.dbm.filters.input.read);
            Array.prototype.push.apply(stack, _this.dbm.actors.read);
            Array.prototype.push.apply(stack, _this.dbm.filters.output.read);
            // run stack
            var next = function () {
                // check if any functions are left to run
                if (stack.length === 0) {
                    resolve();
                }
                // next function to run
                var func = stack.shift();
                // try to run through the whole stack
                try {
                    func(req, res, next);
                }
                catch (err) {
                    // perhaps catch runtime errors that did not set the correct operationoutcome?
                    reject();
                }
            };
            // start next
            next();
        });
    };
    /**
     * Update something in the database
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {Promise}     send back response when all middleware has been run
     */
    DatabaseComponent.prototype.update = function (req, res) {
        var _this = this;
        // return promise about resolution of task
        return new es6_promise_1.Promise(function (resolve, reject) {
            // create stack that are being run
            var stack = [];
            Array.prototype.push.apply(stack, _this.dbm.filters.input.update);
            Array.prototype.push.apply(stack, _this.dbm.actors.update);
            Array.prototype.push.apply(stack, _this.dbm.filters.output.update);
            // run stack
            var next = function () {
                // check if any functions are left to run
                if (stack.length === 0) {
                    resolve();
                }
                // next function to run
                var func = stack.shift();
                // try to run through the whole stack
                try {
                    func(req, res, next);
                }
                catch (err) {
                    // perhaps catch runtime errors that did not set the correct operationoutcome?
                    reject();
                }
            };
            // start next
            next();
        });
    };
    /**
     * Create something in the database
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {Promise}     send back response when all middleware has been run
     */
    DatabaseComponent.prototype.delete = function (req, res) {
        var _this = this;
        // return promise about resolution of task
        return new es6_promise_1.Promise(function (resolve, reject) {
            // create stack that are being run
            var stack = [];
            Array.prototype.push.apply(stack, _this.dbm.filters.input.delete);
            Array.prototype.push.apply(stack, _this.dbm.actors.delete);
            Array.prototype.push.apply(stack, _this.dbm.filters.output.delete);
            // run stack
            var next = function () {
                // check if any functions are left to run
                if (stack.length === 0) {
                    resolve();
                }
                // next function to run
                var func = stack.shift();
                // try to run through the whole stack
                try {
                    func(req, res, next);
                }
                catch (err) {
                    // perhaps catch runtime errors that did not set the correct operationoutcome?
                    reject();
                }
            };
            // start next
            next();
        });
    };
    /**
     * Read history of something in the database
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {Promise}     send back response when all middleware has been run
     */
    DatabaseComponent.prototype.history = function (req, res) {
        var _this = this;
        // return promise about resolution of task
        return new es6_promise_1.Promise(function (resolve, reject) {
            // create stack that are being run
            var stack = [];
            Array.prototype.push.apply(stack, _this.dbm.filters.input.history);
            Array.prototype.push.apply(stack, _this.dbm.actors.history);
            Array.prototype.push.apply(stack, _this.dbm.filters.output.history);
            // run stack
            var next = function () {
                // check if any functions are left to run
                if (stack.length === 0) {
                    resolve();
                }
                // next function to run
                var func = stack.shift();
                // try to run through the whole stack
                try {
                    func(req, res, next);
                }
                catch (err) {
                    // perhaps catch runtime errors that did not set the correct operationoutcome?
                    reject();
                }
            };
            // start next
            next();
        });
    };
    /**
     * Patch something in the database
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {Promise}     send back response when all middleware has been run
     */
    DatabaseComponent.prototype.patch = function (req, res) {
        var _this = this;
        // return promise about resolution of task
        return new es6_promise_1.Promise(function (resolve, reject) {
            // create stack that are being run
            var stack = [];
            Array.prototype.push.apply(stack, _this.dbm.filters.input.patch);
            Array.prototype.push.apply(stack, _this.dbm.actors.patch);
            Array.prototype.push.apply(stack, _this.dbm.filters.output.patch);
            // run stack
            var next = function () {
                // check if any functions are left to run
                if (stack.length === 0) {
                    resolve();
                }
                // next function to run
                var func = stack.shift();
                // try to run through the whole stack
                try {
                    func(req, res, next);
                }
                catch (err) {
                    // perhaps catch runtime errors that did not set the correct operationoutcome?
                    reject();
                }
            };
            // start next
            next();
        });
    };
    DatabaseComponent = __decorate([
        dependency_injector_1.DependencyInjectorComponent.createWith(database_middleware_1.DatabaseMiddleware)
    ], DatabaseComponent);
    return DatabaseComponent;
}());
exports.DatabaseComponent = DatabaseComponent;
