import {SchemaComponent, SchemaModels}    from '../../../schema';
import * as DataTypes  from '../datatypes/primitives';

// backbone elements shuold always be here
class ConceptValue {
    /**
     * Name of the system
     * @type {ElementDefinition}
     */
    public code: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.String
    };
    /**
     * Name of the system
     * @type {ElementDefinition}
     */
    public display: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.String
    };
    /**
     * Defitiontion of the code
     * @type {ElementDefinition}
     */
    public definition: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.String
    };
    /**
     * Name of the system
     * @type {ElementDefinition}
     */
    public abstract: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.Boolean
    };
    /**
     * Subsystem
     * @type {ElementDefinition}
     */
    public concept: SchemaModels.ElementDefinition = {
        required: false,
        type: [ConceptValue]
    };
    /**
     * Crease a new codeValue with data parsed to the class
     * @param {{[key: string]: any}}    data        data to be set as a valueset
     * @param {Enforce}                 validate    level of validation to be applied
     */
    public constructor(data: any, validate: SchemaModels.Enforce) {

        // do nothing
    }
}

/**
 * System of codes that a value can have
 */
@SchemaComponent
class CodeSystem {
    /**
     * Name of the system
     * @type {ElementDefinition}
     */
    public system: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.String
    };
    /**
     * Version of the system
     * @type {ElementDefinition}
     */
    public version: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.String
    };
    /**
     * Values or codes the system can contain
     * @type {ElementDefinition}
     */
    public concept: SchemaModels.ElementDefinition = {
        required: false,
        type: [ConceptValue]
    };
    /**
     * Crease a new codeSystem  with data parsed to the class
     * @param {{[key: string]: any}}    data        data to be set as a valueset
     * @param {Enforce}                 validate    level of validation to be applied
     */
    public constructor(data: any, validate: SchemaModels.Enforce) {

        // do nothing
    }
}

/**
 * Valuset that a binding can be set to
 * @class Valueset
 */
@SchemaComponent
export class Valueset {
    /**
     * codesystem in use
     * @type {ElementDefinition}
     */
    public codeSystem: SchemaModels.ElementDefinition = {
        required: true,
        type: CodeSystem
    };
    /**
     * Creates a new valueset with data parsed to the class
     * @param {{[key: string]: any}}    data    data to be set as a valueset
     */
    public constructor(data: { [key: string]: any }) {

        // do nothing
    }
}
