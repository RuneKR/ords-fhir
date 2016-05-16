import {DomainResource}                 from './DomainResource';
import * as tso                         from 'ts-objectschema';
import {conformanceResourceStatus}      from './valueSets/ConformanceResourceStatus';
import {conformanceStatementKind}       from './valueSets/ConformanceStatementKind';
import {unknownContentCode}             from './valueSets/UnknownContentCode';
import {mimeType}                       from './valueSets/MimeType';
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
class Rest {
    public mode: tso.ElementDefinition = {
        required: true,
        type: tso.datatypes.String
    };
    public documentation: tso.ElementDefinition = {
        required: false,
        type: tso.datatypes.String
    };
    public security: tso.ElementDefinition = {      // set something
        required: false,
        type: tso.datatypes.DateTime
    };
    // CONTINUE
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
        required: false,
        type: tso.datatypes.Boolean
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
        binding: new tso.Binding(tso.BindingStrength.required, 'Something here', conformanceStatementKind),
        required: true,
        type: tso.datatypes.Code
    };
    public fhirVersion: tso.ElementDefinition = {
        required: true,
        type: tso.datatypes.Id
    };
    public acceptUnknown: tso.ElementDefinition = {
        binding: new tso.Binding(tso.BindingStrength.required, 'Something here', unknownContentCode),
        required: true,
        type: tso.datatypes.Code
    };
    public format: tso.ElementDefinition = {
        binding: new tso.Binding(tso.BindingStrength.required, 'Formats supported', mimeType),
        required: true,
        type: tso.datatypes.Code
    };
    public profile: tso.ElementDefinition =  {
        required: false,
        type: [Reference]
    };
    public rest: tso.ElementDefinition =  {
        required: false,
        type: [Rest]
    };
    public constructor(data: IConformance, validate: tso.Enforce) {

        // do noting
        super();
    }
}

/**
 * Configurable config from an implementation
 */
export interface IConformanceConfig {
    version?: string;
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
}

/**
 * Auto generated config
 */
export interface IConformance extends IConformanceConfig {
    name?: string;
    status?: string;
    kind?: string;
    fhirVersion: string;
    acceptUnknown: string;
    format: Array<string>;       
    profile?: Array<IReference>;
    rest: any;      // set to any because of the depth pleas just look at how it is used in ConformanceManager
}
