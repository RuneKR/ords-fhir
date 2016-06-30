import {Values}        from    './values';

/**
 * Description of FHIR elements 
 * @interface ElementDefinition
 */
export interface ElementDefinition {
    /**
     * Indication of binding to a specific valueset
     * @type {Binding}
     */
    values?: Values;
    /**
     * Minimum of instances
     */
    required: boolean;
    /**
     * Types that are allowed for the value
     */
    type: Array<any>;
    /**
     * The value is an array
     */
    array?: boolean;
}
