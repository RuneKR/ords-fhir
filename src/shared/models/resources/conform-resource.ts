import {RuleEntry}              from './rule-entry';
import {Schemas}                from '../../../shared/models/hl7-fhir';
import {SchemaModels}           from 'simple-ts-schema';

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
     * Create a new resource conform to ORDS
     */
    constructor(data: ConformResource) {

        this.restConformance = data.restConformance;
        this.rules = data.rules;
        this.schema = data.schema;
    }
}
