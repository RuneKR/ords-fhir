import {Coding} from './Coding';
import {SchemaModels, SchemaComponent} from '../../../schema';
import * as DataTypes   from    './primitives';

@SchemaComponent
export class Meta {
    public versionId: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.Id
    };
    public lastUpdated: SchemaModels.ElementDefinition = {
        required: true,
        type: DataTypes.Instant
    };
    public profile: SchemaModels.ElementDefinition = {
        required: false,
        type: [DataTypes.Uri]
    };
    public security: SchemaModels.ElementDefinition = {
        required: false,
        type: [DataTypes.Uri]
    };
    public tag: SchemaModels.ElementDefinition = {
        required: false,
        type: [Coding]
    };
        public constructor(data: any, validate: SchemaModels.Enforce) {

        // do nothing

    }
}
