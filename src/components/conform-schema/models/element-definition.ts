/**
 * Description of FHIR elements 
 * @interface ElementDefinition
 */
export interface ElementDefinition {
    path: string;
    short?: string;
    min?: number;
    max?: number;
    type: [{
        code: string;   // bounded by FHIRDefinedType and is actually a code
    }];
    binding: {
        strength: string;   // bounded by BindingStrength and is actually a code
        description?: string;
        valueSetUri: string;    // actually an uri
    };
}
