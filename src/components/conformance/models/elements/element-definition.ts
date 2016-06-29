import {SchemaModels, SchemaComponent} from '../../../schema';
import * as DataTypes                  from '../datatypes/primitives';

class TypeElement {
    public code: SchemaModels.ElementDefinition = {
        max: '*',
        min: 0
    };
}

@SchemaComponent
export class ElementDefinition {
    /**
     * Indication of binding to a specific valueset
     * @type {Binding}
     */
    //public binding: Binding;
    /**
     * Minimum of instances
     */
    public min: SchemaModels.ElementDefinition = {
        max: '*',
        min: 0,
        type: [TypeElement]
    };
    /**
     * Maximum of instances either a number or *
     */
    public max: SchemaModels.ElementDefinition = {
        max: '*',
        min: 0
    };
    /**
     * Type of the property
     * @type {any}
     */
    type: any;
}
