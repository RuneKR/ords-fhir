import {SchemaModels, SchemaComponent} from '../../../schema';
import {boundleType}   from '../valuesets/boundle-type';
import * as DataTypes  from '../datatypes/primitives'; 

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
        type: DataTypes.String
    };
    public url: SchemaModels.ElementDefinition = {
        required: true,
        type: DataTypes.Uri
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
        type: DataTypes.Uri
    };
    public resource: SchemaModels.ElementDefinition = {
        definition: 'The contained resource',
        required: true,
        type: DataTypes.Any
    };
}

@SchemaComponent
export class Boundle {
    public type: SchemaModels.ElementDefinition = {
        binding: new SchemaModels.Binding(SchemaModels.BindingStrength.required, 'Boundle type', boundleType),
        required: true,
        type: DataTypes.String
    };
    public total: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.Number
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
