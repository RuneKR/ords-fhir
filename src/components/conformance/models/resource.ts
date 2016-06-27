export interface RuleEntry {
    datakey: string;
    comparator: string;
    source: string;
    sourcekey: string;
}

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

export class Resource {
    /**
     * Parameters that can be queried / pre indexed variables
     */
    public queryables: Array<SearchParameter>;
    /**
     * Schema for this resource
     */
    public schema: {};
    /**
     * Rules for the usages of this resource
     */
    public rules: Array<RuleEntry>;
    /**
     * Name for the resource
     */
    public name: string;
}
