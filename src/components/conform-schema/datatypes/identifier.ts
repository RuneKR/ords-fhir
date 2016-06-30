import {identifierUse} from '../valuesets/identifier-use';
import {Period} from './Period';
import {Reference} from './Reference';
import {CodeableConcept} from './codeable-concept';
import {SchemaModels, SchemaComponent} from '../../schema';

@SchemaComponent
export class Identifier {
    public use: SchemaModels.ElementDefinition = {
        binding: new SchemaModels.Binding(SchemaModels.BindingStrength.required, 'Description of valueset', identifierUse),
        required: false,
        type: [SchemaModels.Datatypes.String]
    };
    public type: SchemaModels.ElementDefinition = {
        binding: new SchemaModels.Binding(SchemaModels.BindingStrength.extensible, 'Description of valueset', identifierUse),
        required: false,
        type: [CodeableConcept]
    };
    public system: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.Datatypes.Uri]
    };
    public value: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.Datatypes.String]
    };
    public period: SchemaModels.ElementDefinition = {
        required: false,
        type: [Period]
    };
    public assigner: SchemaModels.ElementDefinition = {
        required: false,
        type: [Reference]
    };
    public constructor(data: any, validate: SchemaModels.Enforce) {

        // do nothing

    }
}
