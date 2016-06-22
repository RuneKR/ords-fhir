import * as tso        from 'ts-objectschema';
import {boundleType}   from '../valuesets/boundle-type';

export interface IBoundle {
    type: string;
    total?: number;
    link?: Array<{
        relation: string
        url: string
    }>;
}

@tso.decorators.validate
export class Link {
    public relation: tso.ElementDefinition = {
        required: true,
        type: tso.datatypes.String
    };
    public url: tso.ElementDefinition = {
        required: true,
        type: tso.datatypes.Uri
    };
}

@tso.decorators.validate
export class Entry {
    public link: tso.ElementDefinition = {
        required: false,
        type: Link
    };
    public fulluri: tso.ElementDefinition = {
        required: true,
        type: tso.datatypes.Uri
    };
    public resource: tso.ElementDefinition = {
        definition: 'The contained resource',
        required: true,
        type: tso.datatypes.Any
    };
}

@tso.decorators.autoValidate(tso.Enforce.required)
export class Boundle {
    public type: tso.ElementDefinition = {
        binding: new tso.Binding(tso.BindingStrength.required, 'Boundle type', boundleType),
        required: true,
        type: tso.datatypes.String
    };
    public total: tso.ElementDefinition = {
        required: false,
        type: tso.datatypes.Number
    };
    public link: tso.ElementDefinition = {
        required: false,
        type: Link
    };
    public entry: tso.ElementDefinition = {
        required: false,
        type: Entry
    };
    constructor(data: IBoundle) {

        // do nothing
    }

}
