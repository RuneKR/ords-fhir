"use strict";
var helper_1 = require('./services/helper');
/**
 * Decorator for auto validation of input upon new construction of a resource class
 */
function SchemaComponent(target) {
    'use strict';
    // save a reference to the original constructor
    var original = target;
    // the new constructor behaviour
    var f = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        // apply original constructor
        original.apply(this, args);
        // do validation
        this.popAndValidate(args[0], args[1]);
    };
    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;
    // add functions from the validator
    f.prototype.popAndValidate = helper_1.Helper.prototype.popAndValidate;
    f.prototype.getValueFromType = helper_1.Helper.prototype.getValueFromType;
    f.prototype.setValue = helper_1.Helper.prototype.setValue;
    // return new constructor (will override original)
    return f;
}
exports.SchemaComponent = SchemaComponent;
