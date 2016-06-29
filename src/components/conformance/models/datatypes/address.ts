import {addressUse} from '../valuesets/address-use';
import {SchemaModels, SchemaComponent} from '../../components/schema';

@SchemaComponent
export class Address {
    public use: SchemaModels.ElementDefinition = {
        binding: new SchemaModels.Binding(SchemaModels.BindingStrength.required, 'Description of valueset', addressUse),
        required: false,
        type: SchemaModels.DataTypes.String
    };
    // fortsæt herfra!!!
    public text: SchemaModels.ElementDefinition = {
        required: false,
        type: SchemaModels.DataTypes.String
    };
    public constructor(data: SchemaModels.Valueset, validate: SchemaModels.Enforce) {

        // do nothing
    }
}
