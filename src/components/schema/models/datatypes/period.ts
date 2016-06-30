import {SchemaModels, SchemaComponent} from '../../../schema';
import * as DataTypes   from    './primitives';

@SchemaComponent
export class Period {
    public start: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.DateTime
    };
    public end: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.DateTime
    };
        public constructor(data: any, validate: SchemaModels.Enforce) {

        // do nothing

    }
}
