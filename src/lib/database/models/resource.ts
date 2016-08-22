import {ResourceACL}            from './resource-acl';
import {Schemas}                from '../../../shared/models/hl7-fhir';
import {SchemaModels}           from 'simple-ts-schema';

export class Resource {
    /**
     * Schema for this resource
     */
    public schema: SchemaModels.Schema;
    /**
     * Rules for the usages of this resource
     */
    public acl: ResourceACL;
    /**
     * Name of the resource
     */
    public name: string;
    /**
     * Create a new resource conform to ORDS
     */
    constructor(data: Resource) {
        
        this.name = name;
        this.acl = data.acl;
        this.schema = data.schema;
    }
}
