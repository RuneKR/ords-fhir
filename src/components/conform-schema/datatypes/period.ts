import {SchemaModels, SchemaComponent} from '../../schema';

@SchemaComponent
export class Period {
    public start: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.Datatypes.DateTime]
    };
    public end: SchemaModels.ElementDefinition = {
        required: false,
        type: [SchemaModels.Datatypes.DateTime]
    };
        public constructor(data: any, validate: SchemaModels.Enforce) {

        // do nothing

    }
}
