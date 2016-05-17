// bad way but only way to remain traceability of types

// datatypes
import {datatypes}                from 'ts-objectschema';   // import all from this module

import {Address}                  from '../resources/dataTypes/Address';
import {CodeableConcept}          from '../resources/dataTypes/CodeableConcept';
import {Coding}                   from '../resources/dataTypes/Coding';
import {ContactPoint}             from '../resources/dataTypes/ContactPoint';
import {HumanName}                from '../resources/dataTypes/HumanName';
import {Identifier}               from '../resources/dataTypes/Identifier';
import {Meta}                     from '../resources/dataTypes/Meta';
import {Period}                   from '../resources/dataTypes/Period';
import {Reference}                from '../resources/dataTypes/Reference';

// rest models
import {Observation}              from '../resources/rest/Observation';
import {Patient}                  from '../resources/rest/Patient';

// valuesets
import {AddressUse}                from '../resources/valueSets/AddressUse';
import {ConformanceResourceStatus} from '../resources/valueSets/ConformanceResourceStatus';
import {ConformanceStatementKind}  from '../resources/valueSets/ConformanceStatementKind';
import {IdentifierUse}             from '../resources/valueSets/IdentifierUse';
import {MimeType}                  from '../resources/valueSets/MimeType';
import {NameUse}                   from '../resources/valueSets/NameUse';
import {RestfulConformanceMode}    from '../resources/valueSets/RestfulConformanceMode';
import {UnknownContentCode}        from '../resources/valueSets/UnknownContentCode';

// internal
import {Boundle}                   from '../resources/internal/Boundle';
import {Conformance}               from '../resources/internal/Conformance';
import {DomainResource}            from '../resources/internal/DomainResource';
import {OperationOutcome}          from '../resources/internal/OperationOutcome';
import {StructureDefinition}       from '../resources/internal/StructureDefinition';


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
    public rest: {
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
