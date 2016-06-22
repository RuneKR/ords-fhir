import {Coding} from './Coding';
import {SchemaModels, SchemaComponent} from '../../components/schema';

@SchemaComponent
export class CodeableConcept {
    public coding: SchemaModels.ElementDefinition = {
        required: false,
        type: [Coding]
    };
    public text: SchemaModels.ElementDefinition = {
        required: false,
        type: SchemaModels.DataTypes.String
    };
    public constructor(data: SchemaModels.Valueset, validate: SchemaModels.Enforce) {

        // do nothing

    }
}
