import {SchemaModels, SchemaComponent} from '../../components/schema';
import {boundleType}   from '../valuesets/boundle-type';

export interface IBoundle {
    type: string;
    total?: number;
    link?: Array<{
        relation: string
        url: string
    }>;
}

@SchemaComponent
export class Link {
    public relation: SchemaModels.ElementDefinition = {
        required: true,
        type: SchemaModels.DataTypes.String
    };
    public url: SchemaModels.ElementDefinition = {
        required: true,
        type: SchemaModels.DataTypes.Uri
    };
}

@SchemaComponent
export class Entry {
    public link: SchemaModels.ElementDefinition = {
        required: false,
        type: Link
    };
    public fulluri: SchemaModels.ElementDefinition = {
        required: true,
        type: SchemaModels.DataTypes.Uri
    };
    public resource: SchemaModels.ElementDefinition = {
        definition: 'The contained resource',
        required: true,
        type: SchemaModels.DataTypes.Any
    };
}

@SchemaComponent
export class Boundle {
    public type: SchemaModels.ElementDefinition = {
        binding: new SchemaModels.Binding(SchemaModels.BindingStrength.required, 'Boundle type', boundleType),
        required: true,
        type: SchemaModels.DataTypes.String
    };
    public total: SchemaModels.ElementDefinition = {
        required: false,
        type: SchemaModels.DataTypes.Number
    };
    public link: SchemaModels.ElementDefinition = {
        required: false,
        type: Link
    };
    public entry: SchemaModels.ElementDefinition = {
        required: false,
        type: Entry
    };
    constructor(data: IBoundle) {

        // do nothing
    }

}
