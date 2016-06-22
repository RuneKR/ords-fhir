import {Binding}        from    './binding';

/**
 * Description of FHIR elements 
 * @interface ElementDefinition
 */
export interface ElementDefinition {
    /**
     * Indication of binding to a specific valueset
     * @type {Binding}
     */
    binding?: Binding;
    /**
     * Defitiontion of the property
     * @type {string}
     */
    definition?: string;
    /**
     * Flag to indicate if property is required
     */
    required: boolean;
    /**
     * Short description of the property
     * @type {string}
     */
    short?: string;
    /**
     * Type of the property
     * @type {any}
     */
    type: any;
}
