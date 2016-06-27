export interface RuleEntry {
    datakey: string;
    comparator: string;
    source: string;
    sourcekey: string;
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
    public rules: Array<RuleEntry>;
    /**
     * Name for the resource
     */
    public name: string;
}
