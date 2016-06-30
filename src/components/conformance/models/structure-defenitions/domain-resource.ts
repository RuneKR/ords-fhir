import {SchemaModels, SchemaComponent} from '../../../schema';
import {Meta}                          from '../dataTypes/Meta';
import * as DataTypes                  from '../datatypes/primitives'; 

@SchemaComponent
export class DomainResource {
    public id: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.String
    };
    public meta: SchemaModels.ElementDefinition = {
        required: false,
        type: Meta
    };
    public language: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.String
    };
}
