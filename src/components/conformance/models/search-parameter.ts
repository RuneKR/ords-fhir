// see https://www.hl7.org/fhir/searchparameter.html

export interface SearchParameter {
    /**
     * FHIR search parameter type
     */
    type: string;
    /**
     * The code used in query
     */
    code: string;
    /**
     * The meaning of it
     */
    description: string;
}