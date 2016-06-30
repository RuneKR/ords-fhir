import {SchemaModels, SchemaComponent}  from  '../schema';

/**
 * Read a JSON with the form of a structuredefenition and create corresponding schema
 */
export class ConformSchemaComponent {
    private datatypes: { [key: string]: SchemaModels.Element } = {};
    /**
     * Create datatype schema based on a structure defenition
     */
    public createDatatypeSchema(target: JSON): any {

    }
    /**
     * Create resource schema based on a structure defenition
     */
    public createResurceSchema(target: JSON): any {

        'use strict';

        // save a reference to the original constructor
        let instance: { [key: string]: SchemaModels.ElementDefinition } = new target();

        // the new constructor behaviour
        let f: Function = function (...args: Array<any>): any {

            // do nothing
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

            // calculate values to valueset OBS with only work for codeSystem and for cirtain binding strengths
            if (value.binding.valueset && (value.binding.strength === 'required' || value.binding.strength === 'extensible')) {

                // create schema values
                f.prototype[key].values = this.createSchemaValues(value.binding.valueset);
            }

            // set required
            if (value.min === 0 || value.min === undefined) {
                f.prototype[key].required = false;
            }

            // set array specificas
            if (value.max !== 0) {
                f.prototype[key].array = true;
            }
        });

        // create schema version of it
        let schema: any = SchemaComponent(f);

        // return new constructor (will override original)
        return schema;
    }
    /**
     * Create schema values based upon a valueset
     */
    private createSchemaValues(valueset: any): SchemaModels.Values {

        // reference for values to be found
        let values: SchemaModels.Values = {};

        // recrusive search through valueset code syststem with inline coding
        // compile values of valueset OBS: Only works for codeSystem right now
        function recrusive(holder: any, coding: any, path: string): void {

            'use strict';

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

        // loop the codesystem concept
        Object.keys(valueset.codeSystem.concept).forEach((value: any, index: number) => {

            // keep reference
            values[value.code] = value;

            // deep search for other concepts
            if (value.concept !== undefined) {
                recrusive(values, value, value.code);
            }
        });

        return values;
    }
}
