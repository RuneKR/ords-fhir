import {addressUse} from '../valuesets/address-use';
import {SchemaModels, SchemaComponent} from '../../../schema';
import * as DataTypes   from    './primitives';

@SchemaComponent
export class ContactPoint {
    public use: SchemaModels.ElementDefinition = {
        binding: new SchemaModels.Binding(SchemaModels.BindingStrength.required, 'Description of valueset', addressUse),
        required: false,
        type: DataTypes.String
    };
    // fortsæt herfra!!!
    public text: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.String
    };

    public constructor(data: any, validate: SchemaModels.Enforce) {

        // do nothing

    }
}
