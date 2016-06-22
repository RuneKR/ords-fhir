"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var src_1 = require('../src');
var src_2 = require('../src');
var Patient_1 = require('./dbcon/Patient');
var db_1 = require('./dbcon/db');
var Implementation = (function () {
    function Implementation(rm, dbm, routem) {
        // do something with adding resources
        rm.addResource(new Patient_1.Patient());
        // add exit route
        routem.get('/exit', { isResource: false, middleware: { parsers: {} }, protected: false }, function (req, res, next) {
            res.send('bye');
            process.exit(0);
        });
        // add a feedback
        dbm.actors.read.push(function (req, res, next) {
            res.result = db_1.instance[req.resource.name];
            next();
        });
        // start application
        this.app = new src_2.Application({ port: 8000, prefix: '/api', whitelist: [] });
        console.log('Pleas go to your browser');
        console.log('Visit /exit');
    }
    Implementation = __decorate([
        src_2.DependencyInjectorComponent.createWith(src_1.ConformanceComponent, src_1.DatabaseMiddleware, src_1.RoutingComponent)
    ], Implementation);
    return Implementation;
}());
exports.Implementation = Implementation;
