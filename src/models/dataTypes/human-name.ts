import {nameUse} from '../valuesets/name-use';
import {Period} from './Period';
import {SchemaModels, SchemaComponent} from '../../components/schema';

@SchemaComponent
export class HumanName {
    public use: SchemaModels.ElementDefinition = {
        binding: new SchemaModels.Binding(SchemaModels.BindingStrength.required, 'Description of valueset', nameUse),
        required: false,
        type: SchemaModels.DataTypes.String
    };
    public text: SchemaModels.ElementDefinition = {
        required: false,
        type: SchemaModels.DataTypes.String
    };
    public family: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.DataTypes.String]
    };
    public given: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.DataTypes.String]
    };
    public prefix: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.DataTypes.String]
    };
    public period: SchemaModels.ElementDefinition = {
        required: false,
        type: Period
    };
    public constructor(data: SchemaModels.Valueset, validate: SchemaModels.Enforce) {

        // do nothing

    }
}
