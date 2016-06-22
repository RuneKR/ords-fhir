import {SchemaModels, SchemaComponent} from '../../components/schema';

@SchemaComponent
export class Reference {
    public reference: SchemaModels.ElementDefinition = {
        required: false,
        type: SchemaModels.DataTypes.String
    };
    public display: SchemaModels.ElementDefinition = {
        required: false,
        type: SchemaModels.DataTypes.String
    };
    public constructor(data: SchemaModels.Valueset, validate: SchemaModels.Enforce) {

        // do nothing

    }
}
