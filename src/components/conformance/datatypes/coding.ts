import {PropertyDefinition}         from    '../property-definition';
import * as Datatypes               from    './primeitive';
import {SchemaComponent}            from    '../../schema.component';
import {Enforce}                    from    '../enforce';

export interface ICoding {
    system: string;
    version: string;
    code: string;
    display: string;
    userSelected: boolean;
}

@SchemaComponent
export class Coding {
    public system: PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Uri]
    };
    public version: PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.String]
    };
    public code: PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Code]
    };
    public display: PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.String]
    };
    public userSelected: PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Boolean]
    };
    constructor(data: any, enforce: Enforce) {

        // do nothing
    }
}
