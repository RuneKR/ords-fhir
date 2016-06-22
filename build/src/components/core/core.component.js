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
     * Create an instance of target and inject from the listed dependencies
     * @param   {...any}  dependencies  list of dependencies needed to resolved
     * @returns {void}
     */
    DependencyInjector.prototype.createWith = function () {
        var _this = this;
        var dependencies = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            dependencies[_i - 0] = arguments[_i];
        }
        // return the function specified by ts documentation
        return function (target) {
            // preapre this argument
            var instance = Object.create(target.prototype);
            var args = [];
            // loop all the dependencies if a singleton allready exsists
            for (var _i = 0, dependencies_1 = dependencies; _i < dependencies_1.length; _i++) {
                var entry = dependencies_1[_i];
                // generate a new singleton
                if (_this.singletons[entry] === undefined) {
                    _this.singletons[entry] = new entry();
                }
                // set the value of target to the required singleton      
                args.push(_this.singletons[entry]);
            }
            // call target and save reference as singleton
            target.apply(instance, args);
            _this.singletons[target] = instance;
        };
    };
    /**
     * Inject a singleton into a property of a class
     * @param   {any}       dependency  list of dependencies needed to resolve
     * @returns {Function}  declaration for a property function
     */
    DependencyInjector.prototype.inject = function (dependency) {
        var _this = this;
        // return the function specified by ts documentation
        return function (target, propertyKey) {
            // if singleton do not exsists create a new one
            if (_this.singletons[dependency] === undefined) {
                _this.singletons[dependency] = new dependency();
            }
            // set the value of target to the required singleton      
            target[propertyKey] = _this.singletons[dependency];
        };
    };
    return DependencyInjector;
}());
exports.DependencyInjector = DependencyInjector;
/**
 * Singleton for managing injections
 */
exports.CoreComponent = new DependencyInjector();
