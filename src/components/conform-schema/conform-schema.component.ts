import {SchemaModels, SchemaComponent}  from  '../schema';

// recrusive search through valueset code syststem with inline coding
// compile values of valueset OBS: Only works for codeSystem right now
function recrusive(holder: any, coding: any, path: string): void {

    // read the concept
    Object.keys(coding.concept).forEach((value: any, index: number) => {

        // keep reference
        holder[path + '.' + value.code] = value;

        // deep search for other concepts
        if (value.concept !== undefined) {
            recrusive(holder, value, path + '.' + value.code);
        }
    });
}

/**
 * Convert between conformance and schema
 */
export function ConformSchemaComponent(target: any): any {

    'use strict';

    // save a reference to the original constructor
    let instance: { [key: string]: SchemaModels.ElementDefinition } = new target();

    // reference for values to be found
    let values: any;

    // the new constructor behaviour
    let f: Function = function (...args: Array<any>): any {

        // do validation
        this.popAndValidate(args[0], args[1]);
    };

    // loop through all object keys
    Object.keys(instance).forEach((value: any, key: any) => {

        // set types
        f.prototype[key] = {
            array: false,
            required: true,
            types: value.type.map((iv: any) => {
                // pull the code out
                return iv.code;
            })
        };

        // calculate values to valueset OBS with only work for codeSystem
        if (value.binding.valueset) {

            // init empty
            values = {};

            // loop the concept
            Object.keys(value.binding.valueset.codeSystem.concept).forEach((iv: any, index: number) => {

                // keep reference
                values[iv.code] = iv;

                // deep search for other concepts
                if (value.concept !== undefined) {
                    recrusive(values, value, value.code);
                }
            });
        }

        // set required
        if (value.min === 0 || value.min === undefined) {
            target.prototype[key].required = false;
        }

        // set array specificas
        if (value.max !== 0) {
            target.prototype[key].array = true;
        }
    });

    // create schema version of it
    let schema: any = SchemaComponent(f);

    // return new constructor (will override original)
    return schema;
}
