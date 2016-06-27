export interface RuleEntry {
    datakey: string;
    comparator: string;
    source: string;
    sourcekey: string;
}

export interface Rule {
    field: Array<string>;
    rules: Array<RuleEntry>;
}

export class Resource {
    /**
     * Parameters that can be queried / pre indexed variables
     */
    public queryables: any = {};
    /**
     * Schema for this resource
     */
    public schema: {};
    /**
     * Rules for the usages of this resource
     */
    public rules: Rule;
    /**
     * Name for the resource
     */
    public name: string;
}
