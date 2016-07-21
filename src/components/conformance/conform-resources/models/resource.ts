import {SearchParameter}        from './structure-definitions/search-parameter';
import {StructureDefinition}    from './structure-definition';
import {SchemaModels}           from '../../schema';

export interface RuleEntry {
    datakey: string;
    comparator: string;
    source: string;
    sourcekey: string;
}

export interface IConformResource {
    structure: StructureDefinition;
    queryables: Array<SearchParameter>;
    rules: Array<RuleEntry>;
    schema: SchemaModels.Schema;
}

export class Resource {
    /**
     * Parameters that can be queried / pre indexed variables
     */
    public queryables: Array<SearchParameter>;
    /**
     * Schema for this resource
     */
    public schema: SchemaModels.Schema;
    /**
     * Rules for the usages of this resource
     */
    public rules: Array<RuleEntry>;
    /**
     * Name for the resource
     */
    public name: string;
    /**
     * Name for the resource
     */
    public structure: StructureDefinition;
    /**
     * Create a new resource conform to ORDS
     */
    constructor(data: IConformResource) {

        this.queryables = data.queryables;
        this.rules      = data.rules;
        this.schema     = data.schema;

        // set name to this
        this.name       = data.structure.id;
    }
}
