import {DomainResource}                 from './DomainResource';
import * as tso                         from 'ts-objectschema';
import {conformanceResourceStatus}      from './valueSets/conformanceResourceStatus';
import {ContactPoint, IContactPoint}    from './datatypes/ContactPoint';
import {Reference, IReference}          from './datatypes/Reference';

/**
 * Back bone elements
 */
@tso.decorators.validate
class Contact {
    public name: tso.ElementDefinition = {
        required: false,
        type: tso.datatypes.String
    };
    public telecom: tso.ElementDefinition = {
        required: false,
        type: [ContactPoint]
    };
}

@tso.decorators.validate
class Software {
    public name: tso.ElementDefinition = {
        required: true,
        type: tso.datatypes.String
    };
    public version: tso.ElementDefinition = {
        required: false,
        type: tso.datatypes.String
    };
    public releaseDate: tso.ElementDefinition = {
        required: false,
        type: tso.datatypes.DateTime
    };
}

@tso.decorators.validate
class Implementation {
    public description: tso.ElementDefinition = {
        required: true,
        type: tso.datatypes.String
    };
    public url: tso.ElementDefinition = {
        required: false,
        type: tso.datatypes.Uri
    };
}

/**
 * Conformance as specified by HL7 FHIR
 */
export class Conformance extends DomainResource {
    public version: tso.ElementDefinition = {
        required: false,
        type: tso.datatypes.String
    };
    public name: tso.ElementDefinition = {
        required: false,
        type: tso.datatypes.String
    };
    public status: tso.ElementDefinition = {
        binding: new tso.Binding(tso.BindingStrength.required, 'Something here', conformanceResourceStatus),
        required: false,
        type: tso.datatypes.Code
    };
    public experimental: tso.ElementDefinition = {
        binding: new tso.Binding(tso.BindingStrength.required, 'Something here', conformanceResourceStatus),
        required: false,
        type: tso.datatypes.Code
    };
    public publisher: tso.ElementDefinition = {
        required: false,
        type: tso.datatypes.String
    };
    public contact: tso.ElementDefinition = {
        required: true,
        type: [Contact]
    };
    public date: tso.ElementDefinition = {
        required: true,
        type: tso.datatypes.DateTime
    };
    public description: tso.ElementDefinition = {
        required: false,
        type: tso.datatypes.String
    };
    public requirements: tso.ElementDefinition = {
        required: false,
        type: tso.datatypes.String
    };
    public copyright: tso.ElementDefinition = {
        required: false,
        type: tso.datatypes.String
    };
    public kind: tso.ElementDefinition = {
        binding: new tso.Binding(tso.BindingStrength.required, 'Something here', conformanceResourceStatus),
        required: false,
        type: tso.datatypes.Code
    };
    public software: tso.ElementDefinition = {
        required: false,
        type: Software
    };
    public implementation: tso.ElementDefinition = {
        required: false,
        type: Implementation
    };
    public fhirVersion: tso.ElementDefinition = {
        required: true,
        type: tso.datatypes.Id
    };
    public acceptUnknown: tso.ElementDefinition = {
        binding: new tso.Binding(tso.BindingStrength.required, 'Something here', conformanceResourceStatus),
        required: true,
        type: tso.datatypes.Code
    };
    public format: tso.ElementDefinition = {
        binding: new tso.Binding(tso.BindingStrength.required, 'Something here', conformanceResourceStatus),
        required: true,
        type: [tso.datatypes.Code]
    };
    public profile: tso.ElementDefinition =  {
        required: false,
        type: [Reference]
    };
    public constructor(data: IConformance, validate: tso.Enforce) {

        // do noting
        super();
    }
}

/**
 * Interface for conformance
 */
export interface IConformance {
    version?: string;
    name?: string;
    status?: boolean;
    experimental?: boolean;
    publisher?: string;
    contact?: Array<{
        name?: string;
        telecom?: IContactPoint;
    }>;
    date: Date;
    description?: string;
    requirements?: string;
    copyright?: string;
    kind?: string;
    software?: {
        name?: string;
        version?: string;
        releaseDate?: Date;
    };
    implementation?: {
        description?: string;
        url: string;
    };
    fhirVersion?: string;
    acceptUnknown: string;
    formant: Array<string>;       
    profile?: Array<IReference>;
}

export let conformance: Conformance;
