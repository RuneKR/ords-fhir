import {RuleEntry}              from './rule-entry';
import {Schemas}                from '../../../shared/models/hl7-fhir';
import {SchemaModels}           from 'simple-ts-schema';

export interface IConformResource {
    /**
     * Parameters that can be queried / pre indexed variables
     */
    restConformance: Schemas.IRestResource;
    /**
     * Schema for this resource
     */
    schema: SchemaModels.Schema;
    /**
     * Rules for the usages of this resource
     */
    rules: Array<RuleEntry>;
    /**
     * Name for the resource
     */
    structure: Schemas.IStructureDefinition;
}

export class ConformResource {
    /**
     * Parameters that can be queried / pre indexed variables
     */
    public restConformance: Schemas.IRestResource;
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
    public structure: Schemas.IStructureDefinition;
    /**
     * Create a new resource conform to ORDS
     */
    constructor(data: IConformResource) {

        this.restConformance = data.restConformance;
        this.rules = data.rules;
        this.schema = data.schema;
    }
}
