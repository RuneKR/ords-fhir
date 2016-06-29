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
     * Minimum of instances
     */
    required: boolean;
    /**
     * Maximum of instances either number or a *
     */
    type: Array<any> | any;
}
