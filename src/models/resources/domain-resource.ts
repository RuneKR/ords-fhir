import {SchemaModels, SchemaComponent} from '../../components/schema';
import {Meta}                          from '../dataTypes/Meta';

@SchemaComponent
export class DomainResource {
    public id: SchemaModels.ElementDefinition = {
        required: false,
        type: SchemaModels.DataTypes.String
    };
    public meta: SchemaModels.ElementDefinition = {
        required: false,
        type: Meta
    };
    public language: SchemaModels.ElementDefinition = {
        required: false,
        type: SchemaModels.DataTypes.String
    };
}
