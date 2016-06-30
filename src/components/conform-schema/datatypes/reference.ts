import {SchemaModels, SchemaComponent} from '../../schema';

@SchemaComponent
export class Reference {
    public reference: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.Datatypes.String]
    };
    public display: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.Datatypes.String]
    };
    public constructor(data: any, validate: SchemaModels.Enforce) {

        // do nothing

    }
}
