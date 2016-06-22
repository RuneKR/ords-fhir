"use strict";
/**
 * Manage singletons for all dependencies
 * @class DependencyInjector
 */
var DependencyInjector = (function () {
    function DependencyInjector() {
        /**
         * Contains all initiated singletons
         */
        this.singletons = {};
    }
    /**
     * Get a list of singletons from the dependencies
     * @param   {...any}  dependencies  list of dependencies needed to resolved
     * @returns {Array<any>}            list of singletons
     */
    DependencyInjector.prototype.getSingletons = function (dependencies) {
        var args = [];
        // loop all the dependencies if a singleton allready exsists
        for (var _i = 0, dependencies_1 = dependencies; _i < dependencies_1.length; _i++) {
            var entry = dependencies_1[_i];
            // generate a new singleton
            if (this.singletons[entry] === undefined) {
                this.singletons[entry] = new entry();
            }
            // set the value of target to the required singleton      
            args.push(this.singletons[entry]);
        }
        // return the found or created singletons
        return args;
    };
    /**
     * Get a single singleton
     * @param   {any}       dependency  the dependency that is needed as a singleton
     * @returns {any}       return the found singleton
     */
    DependencyInjector.prototype.getSingleton = function (dependency) {
        // if singleton do not exsists create a new one
        if (this.singletons[dependency] === undefined) {
            this.singletons[dependency] = new dependency();
        }
        // set the value of target to the required singleton      
        return this.singletons[dependency];
    };
    return DependencyInjector;
}());
exports.DependencyInjector = DependencyInjector;
/**
 * Singleton for managing injections
 */
exports.DI = new DependencyInjector();
