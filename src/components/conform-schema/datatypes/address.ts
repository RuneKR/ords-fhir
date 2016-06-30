import {addressUse} from '../valuesets/address-use';
import {SchemaModels, SchemaComponent} from '../../schema';

@SchemaComponent
export class Address {
    public use: SchemaModels.ElementDefinition = {
        binding: new SchemaModels.Binding(SchemaModels.BindingStrength.required, 'Description of valueset', addressUse),
        required: false,
        type: [SchemaModels.Datatypes.String]
    };
    // fortsæt herfra!!!
    public text: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.Datatypes.String]
    };
    public constructor(data: any, validate: SchemaModels.Enforce) {

        // do nothing
    }
}
