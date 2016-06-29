import {SchemaModels, SchemaComponent} from '../../../schema';
import * as DataTypes   from    './primitives';

@SchemaComponent
export class Reference {
    public reference: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.String
    };
    public display: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.String
    };
    public constructor(data: any, validate: SchemaModels.Enforce) {

        // do nothing

    }
}
