import {SchemaModels, SchemaComponent} from '../../components/schema';

@SchemaComponent
export class Coding {
    public system: SchemaModels.ElementDefinition = {
        required: false,
        type: SchemaModels.DataTypes.Uri
    };
    public version: SchemaModels.ElementDefinition = {
        required: false,
        type: SchemaModels.DataTypes.String
    };
    public display: SchemaModels.ElementDefinition = {
        required: false,
        type: SchemaModels.DataTypes.String
    };
    public userSelected: SchemaModels.ElementDefinition = {
        required: false,
        type: SchemaModels.DataTypes.Boolean
    };
    public code: SchemaModels.ElementDefinition = {
        required: false,
        type: SchemaModels.DataTypes.Code
    };
    public constructor(data: SchemaModels.Valueset, validate: SchemaModels.Enforce) {

        // do nothing

    }
}
