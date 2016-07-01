import {SchemaModels, SchemaComponent}  from  '../schema';
import {ElementDefinition}              from  './models/element-definition';

/**
 * Read a JSON with the form of a structuredefenition and create corresponding schema
 */
export class ConformSchemaComponent {
    /**
     * Builded schema values by their uri
     */
    private values: { [key: string]: SchemaModels.Values } = {};
    /**
     * Data types that can can activly exists
     */
    private datatypes: { [key: string]: SchemaModels.Values } = {};
    /**
     * Create resource schema based on a structure defenition snapshot
     */
    public createResurceSchema(target: Array<ElementDefinition>): SchemaModels.Schema {

        // the new constructor behaviour
        let schema: any = (data: any, enforce?: SchemaModels.Enforce) => {

            // do nothing
        };

        // loop through all object keys
        Object.keys(target).forEach((value: any, key: any) => {

            // set types (protype model duer IKKE!)
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

                // get schema values based upon the valueSetUri
                schema.prototype[key].values = this.getSchemaValues(value.binding.valueSetUri);
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
     * Create new instance and bind local valuesets and datatypes
     */
    constructor() {

        // load primeary data from schema
        Object.keys(SchemaModels.Datatypes).forEach((value: any, type: any) => {
            
            // convert first to lower case sice all primeary types are supposed to be so
            this.datatypes[type.charAt(0).toLowerCase() + type.slice(1)] = value;
        });

        // then load the advanced
        

    }
    /**
     * Gets schema values based on its uri
     */
    private getSchemaValues(uri: string): SchemaModels.Values {

        //Throw error if valueset do not exists
        return this.values[uri];
    }
}
