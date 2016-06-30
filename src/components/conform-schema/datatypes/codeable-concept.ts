import {Coding} from './Coding';
import {SchemaModels, SchemaComponent} from '../../schema';

@SchemaComponent
export class CodeableConcept {
    public coding: SchemaModels.ElementDefinition = {
        required: false,
        type: [Coding],
        array: true
    };
    public text: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.Datatypes.String]
    };
    public constructor(data: any, validate: SchemaModels.Enforce) {

        // do nothing

    }
}
