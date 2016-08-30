import {Schemas}                from '../../../shared/models/hl7-fhir';
import {SchemaModels}           from 'simple-ts-schema';

export class Resource {
    /**
     * Schema for this resource
     */
    public schema: SchemaModels.Schema;
    /**
     * Name of the resource
     */
    public name: string;
    /**
     * Create a new resource conform to ORDS
     */
    constructor(data: Resource) {
        
        this.name = name;
        this.schema = data.schema;
    }
}
