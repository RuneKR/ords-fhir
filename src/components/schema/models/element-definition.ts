import {Values}        from    './values';

/**
 * Description of FHIR elements 
 * @interface ElementDefinition
 */
export interface ElementDefinition {
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
