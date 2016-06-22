import {Coding} from './Coding';
import {SchemaModels, SchemaComponent} from '../../components/schema';

@SchemaComponent
export class Meta {
    public versionId: SchemaModels.ElementDefinition = {
        required: false,
        type: SchemaModels.DataTypes.Id
    };
    public lastUpdated: SchemaModels.ElementDefinition = {
        required: true,
        type: SchemaModels.DataTypes.Instant
    };
    public profile: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.DataTypes.Uri]
    };
    public security: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.DataTypes.Uri]
    };
    public tag: SchemaModels.ElementDefinition = {
        required: false,
        type: [Coding]
    };
        public constructor(data: SchemaModels.Valueset, validate: SchemaModels.Enforce) {

        // do nothing

    }
}
