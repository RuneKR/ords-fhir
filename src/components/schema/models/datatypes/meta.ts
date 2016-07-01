import {PropertyDefinition}         from    '../property-definition';
import * as Datatypes               from    './primeitive';
import {SchemaComponent}            from    '../../schema.component';
import {Enforce}                    from    '../enforce';
import {ICoding, Coding}            from     './Coding';

export interface IMeta {
    versionId: number;
    lastUpdated: string;
    profile: string;
    tag: string;
    security: ICoding;
}

@SchemaComponent
export class Meta {
    public versionId: PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Id]
    };
    public lastUpdated: PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Instant]
    };
    public profile: PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Uri]
    };
    public tag: PropertyDefinition = {
        min: 0,
        types: [Coding]
    };
    public security: PropertyDefinition = {
        min: 0,
        types: [Coding]
        // there are some binding to remember here
    };
    constructor(data: any, enforce: Enforce) {

        // do nothing
    }
}