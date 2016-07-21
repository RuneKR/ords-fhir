import {SchemaHelper}   from    './schema.helper';
import {Enforce}        from    './models/enforce';

/**
 * Decorator for auto validation of input upon new construction of a resource class
 */
export function SchemaComponent(target: any): any {

    'use strict';

    // save a reference to the original constructor
    let original: Function = target;

    // the new constructor behaviour
    let f: Function = function (...args: Array<any>): any {

        // auto do required if nothing is included
        if (args.length === 1) {
            args.push(Enforce.required);
        }

        // apply original constructor
        original.apply(this, args);

        // do validation
        this.popAndValidate(args[0], args[1]);
    };

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;

    // add functions from the validator
    f.prototype.popAndValidate = SchemaHelper.prototype.popAndValidate;
    f.prototype.getValueFromType = SchemaHelper.prototype.getValueFromType;
    f.prototype.setValue = SchemaHelper.prototype.setValue;

    // return new constructor (will override original)
    return f;
}
