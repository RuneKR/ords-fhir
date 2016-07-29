import {SchemaComponent, SchemaModels}            from    'simple-ts-schema';
import * as Datatypes                             from    './primeitive';
import {ICoding, Coding}                          from     './Coding';

export interface IMeta {
    versionId: number;
    lastUpdated: string;
    profile: string;
    tag: string;
    security: ICoding;
}

@SchemaComponent
export class Meta {
    public versionId: SchemaModels.PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Id]
    };
    public lastUpdated: SchemaModels.PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Instant]
    };
    public profile: SchemaModels.PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Uri]
    };
    public tag: SchemaModels.PropertyDefinition = {
        min: 0,
        types: [Coding]
    };
    public security: SchemaModels.PropertyDefinition = {
        min: 0,
        types: [Coding]
        // there are some binding to remember here https://www.hl7.org/fhir/valueset-security-labels.html
    };
    constructor(data: any, enforce: SchemaModels.Enforce) {

        // do nothing
    }
}