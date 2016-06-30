import {SchemaModels, SchemaComponent} from '../../../schema';
import * as DataTypes   from    './primitives';

@SchemaComponent
export class Coding {
    public system: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.Uri
    };
    public version: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.String
    };
    public display: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.String
    };
    public userSelected: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.Boolean
    };
    public code: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.Code
    };
    public constructor(data: any, validate: SchemaModels.Enforce) {

        // do nothing

    }
}
