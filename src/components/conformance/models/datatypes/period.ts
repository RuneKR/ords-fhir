import {SchemaModels, SchemaComponent} from '../../components/schema';

@SchemaComponent
export class Period {
    public start: SchemaModels.ElementDefinition = {
        required: false,
        type: SchemaModels.DataTypes.DateTime
    };
    public end: SchemaModels.ElementDefinition = {
        required: false,
        type: SchemaModels.DataTypes.DateTime
    };
        public constructor(data: SchemaModels.Valueset, validate: SchemaModels.Enforce) {

        // do nothing

    }
}
