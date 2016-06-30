import {SchemaModels, SchemaComponent} from '../../schema';

@SchemaComponent
export class Coding {
    public system: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.Datatypes.Uri]
    };
    public version: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.Datatypes.String]
    };
    public display: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.Datatypes.String]
    };
    public userSelected: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.Datatypes.Boolean]
    };
    public code: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.Datatypes.Code]
    };
    public constructor(data: any, validate: SchemaModels.Enforce) {

        // do nothing

    }
}
