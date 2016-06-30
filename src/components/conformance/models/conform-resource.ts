import {SearchParameter}        from './resources/search-parameter';
import {StructureDefenition}    from './resources/structure-defenition';

export interface RuleEntry {
    datakey: string;
    comparator: string;
    source: string;
    sourcekey: string;
}

export interface IConformResource {
    structure: StructureDefenition;
    queryables: Array<SearchParameter>;
    rules: Array<RuleEntry>;
}

export class ConformResource {
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
    /**
     * Create a new resource conform to ORDS
     */
    constructor(data: IConformResource) {

        this.queryables = data.queryables;
        this.rules = data.rules;

        this.name = data.structure.id;
    }
}