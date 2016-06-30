import {SchemaModels, SchemaComponent}  from  '../schema';

/**
 * Read a JSON with the form of a structuredefenition and create corresponding schema
 */
export class ConformSchemaComponent {
    /**
     * Builded schema values by their uri
     */
    private values: { [key: string]: SchemaModels.Element } = {};
    /**
     * Data types that can can activly exists
     */
    private datatypes: { [key: string]: SchemaModels.Element } = {};
    /**
     * Create datatype schema based on a structure defenition
     */
    public createDatatypeSchema(target: JSON): any {

    }
    /**
     * Create resource schema based on a structure defenition
     */
    public createResurceSchema(target: JSON): SchemaModels.Schema {

        // the new constructor behaviour
        let schema: any = (data: any, enforce?: SchemaModels.Enforce) => {

            // do nothing
        };

        // loop through all object keys
        Object.keys(target).forEach((value: any, key: any) => {

            // set types
            schema.prototype[key] = {
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
                schema.prototype[key].values = this.createSchemaValues(value.binding.valueset);
            }

            // set required
            if (value.min === 0 || value.min === undefined) {
                schema.prototype[key].required = false;
            }

            // set array specificas
            if (value.max !== 0) {
                schema.prototype[key].array = true;
            }
        });

        // return the builded schema
        return SchemaComponent(schema);
    }
    /**
     * Create schema values based upon a valueset
     */
    private createSchemaValues(valueset: any): SchemaModels.Values {

        // reference for values to be found
        let values: SchemaModels.Values = {};

        // recrusive search through valueset code syststem with inline coding
        // compile values of valueset OBS: Only works for codeSystem right now
        // NOTE (not implemented):
        // Respekct case sensitivity field
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

        // loop the codesystem concept
        Object.keys(valueset.codeSystem.concept).forEach((value: any, index: number) => {

            // keep reference
            values[value.code] = value;

            // deep search for other concepts
            if (value.concept !== undefined) {
                recrusive(values, value, value.code);
            }
        });

        // save reference to values if they are later to be used
        this.values[valueset.url] = values;

        return values;
    }
}
