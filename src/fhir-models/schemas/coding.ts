import {SchemaComponent, SchemaModels}            from    '../../lib/schema';
import * as Datatypes                             from    './primeitive';


export interface ICoding {
    system: string;
    version: string;
    code: string;
    display: string;
    userSelected: boolean;
}

@SchemaComponent
export class Coding {
    public system: SchemaModels.PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Uri]
    };
    public version: SchemaModels.PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.String]
    };
    public code: SchemaModels.PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Code]
    };
    public display: SchemaModels.PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.String]
    };
    public userSelected: SchemaModels.PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Boolean]
    };
    constructor(data: any, enforce: SchemaModels.Enforce) {

        // do nothing
    }
}
