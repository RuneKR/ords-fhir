// bad way but only way to remain traceability of types

// datatypes
import {datatypes}                from 'ts-objectschema';   // import all from this module

import {Address}                  from '../models/dataTypes/Address';
import {CodeableConcept}          from '../models/dataTypes/CodeableConcept';
import {Coding}                   from '../models/dataTypes/Coding';
import {ContactPoint}             from '../models/dataTypes/ContactPoint';
import {HumanName}                from '../models/dataTypes/HumanName';
import {Identifier}               from '../models/dataTypes/Identifier';
import {Meta}                     from '../models/dataTypes/Meta';
import {Period}                   from '../models/dataTypes/Period';
import {Reference}                from '../models/dataTypes/Reference';

// rest models
import {Observation}              from '../models/resources/Observation';
import {Patient}                  from '../models/resources/Patient';

// valuesets
import {AddressUse}                from '../models/valueSets/AddressUse';
import {ConformanceResourceStatus} from '../models/valueSets/ConformanceResourceStatus';
import {ConformanceStatementKind}  from '../models/valueSets/ConformanceStatementKind';
import {IdentifierUse}             from '../models/valueSets/IdentifierUse';
import {MimeType}                  from '../models/valueSets/MimeType';
import {NameUse}                   from '../models/valueSets/NameUse';
import {RestfulConformanceMode}    from '../models/valueSets/RestfulConformanceMode';
import {UnknownContentCode}        from '../models/valueSets/UnknownContentCode';

// internal
import {Boundle}                   from '../models/internal/Boundle';
import {Conformance}               from '../models/internal/Conformance';
import {DomainResource}            from '../models/internal/DomainResource';
import {OperationOutcome}          from '../models/internal/OperationOutcome';
import {StructureDefinition}       from '../models/internal/StructureDefinition';

/**
 * Manage every resource in the application
 */
export class ResourceManager {
    /**
     * Container of all internal resources by their name
     * @type {{[key: string]: any}}
     */
    public internal: {
        [key: string]: any
        Boundle: any,
        Conformance: any,
        DomainResource: any
        OperationOutcome: any,
        StructureDefinition: any
    } = {
        Boundle: Boundle,
        Conformance: Conformance,
        DomainResource: DomainResource,
        OperationOutcome: OperationOutcome,
        StructureDefinition: StructureDefinition
    };
    /**
     * Container of all active models by their name
     * @type {{[key: string]: any}}
     */
    public resources: {
        [key: string]: any
        Observation: any,
        Patient: any
    } = {
        Observation: Observation,
        Patient: Patient
    };
    /**
     * Container of all active valueSets by their name
     * @type {{[key: string]: any}}
     */
    public valueSets: {
        [key: string]: any
        AddressUse: any,
        ConformanceResourceStatus: any,
        ConformanceStatementKind: any,
        IdentifierUse: any,
        MimeType: any,
        NameUse: any,
        RestfulConformanceMode: any,
        UnknownContentCode: any
    } = {
        AddressUse: AddressUse,
        ConformanceResourceStatus: ConformanceResourceStatus,
        ConformanceStatementKind: ConformanceStatementKind,
        IdentifierUse: IdentifierUse,
        MimeType: MimeType,
        NameUse: NameUse,
        RestfulConformanceMode: RestfulConformanceMode,
        UnknownContentCode: UnknownContentCode
    };
    /**
     * Container of all active dataTypes by their name
     * @type {{[key: string]: any}}
     */
    public dataTypes: {
        [key: string]: any
        Address: any,
        CodeableConcept: any,
        Coding: any,
        ContactPoint: any,
        HumanName: any,
        Identifier: any,
        Meta: any,
        Period: any,
        Boolean: any,
        Code: any,
        DateTime: any,
        Id: any,
        Instant: any,
        Number: any,
        String: any,
        Uri: any
    } = {
        Address: Address,
        Boolean: datatypes.Boolean,
        Code: datatypes.Code,
        CodeableConcept: CodeableConcept,
        Coding: Coding,
        ContactPoint: ContactPoint,
        DateTime: datatypes.DateTime,
        HumanName: HumanName,
        Id: datatypes.Id,
        Identifier: Identifier,
        Instant: datatypes.Instant,
        Meta: Meta,
        Number: datatypes.Number,
        Period: Period,
        Reference: Reference,
        String: datatypes.String,
        Uri: datatypes.Uri
    };
}
