import {Coding} from './Coding';
import {SchemaModels, SchemaComponent} from '../../../schema';
import * as DataTypes   from    './primitives';

@SchemaComponent
export class CodeableConcept {
    public coding: SchemaModels.ElementDefinition = {
        required: false,
        type: [Coding]
    };
    public text: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.String
    };
    public constructor(data: any, validate: SchemaModels.Enforce) {

        // do nothing

    }
}
