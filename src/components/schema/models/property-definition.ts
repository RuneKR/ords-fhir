import {Values}        from    './values';

/**
 * Clean version of ElementDefinition from HL7 FHIR
 */
export interface PropertyDefinition {
    /**
     * Values it can have
     */
    values?: Values;
    /**
     * Minimum of instances
     */
    min: number;
    /**
     * maximum number of instances
     */
    max?: number;
    /**
     * Types it can have
     */
    types: Array<any>;
}
