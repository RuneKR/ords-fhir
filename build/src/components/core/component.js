"use strict";
var dependency_injector_1 = require('./services/dependency-injector');
/**
 * Create an instance of target and inject from the listed dependencies
 * @param   {...any}  dependencies  list of dependencies needed to resolved
 * @returns {void}
 */
function CreateWith() {
    'use strict';
    var dependencies = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        dependencies[_i - 0] = arguments[_i];
    }
    // return the function specified by ts documentation
    return function (target) {
        // preapre this argument
        var instance = Object.create(target.prototype);
        // call target and save reference as singleton
        target.apply(instance, dependency_injector_1.DI.getSingletons(dependencies));
        dependency_injector_1.DI.singletons[target] = instance;
    };
}
exports.CreateWith = CreateWith;
/**
 * Inject a singleton into a property of a class
 * @param   {any}       dependency  list of dependencies needed to resolve
 * @returns {Function}  declaration for a property function
 */
function Inject(dependency) {
    'use strict';
    // return the function specified by ts documentation
    return function (target, propertyKey) {
        // set the value of target to the required singleton      
        target[propertyKey] = dependency_injector_1.DI.getSingleton(dependency);
    };
}
exports.Inject = Inject;
