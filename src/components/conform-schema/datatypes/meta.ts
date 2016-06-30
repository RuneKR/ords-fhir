import {Coding} from './Coding';
import {SchemaModels, SchemaComponent} from '../../schema';

@SchemaComponent
export class Meta {
    public versionId: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.Datatypes.Id]
    };
    public lastUpdated: SchemaModels.ElementDefinition = {
        required: true,
        type: [SchemaModels.Datatypes.Instant]
    };
    public profile: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.Datatypes.Uri],
        array: true
    };
    public security: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.Datatypes.Uri],
        array: true
    };
    public tag: SchemaModels.ElementDefinition = {
        required: false,
        type: [Coding],
        array: true
    };
        public constructor(data: any, validate: SchemaModels.Enforce) {

        // do nothing

    }
}
