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
    //binding?: Binding;
    /**
     * Minimum of instances
     */
    min: number;
    /**
     * Maximum of instances either number or a *
     */
    max: number | string;
    /**
     * Type of the property
     * @type {any}
     */
    type: Array<{
        code: any;
    }>;
}
