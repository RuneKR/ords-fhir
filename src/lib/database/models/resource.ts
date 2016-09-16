import {SchemaModels}           from 'simple-ts-schema';
import {ResourceACL}            from './resource-acl';

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
     * ACL control 
     */
    public acl: ResourceACL;
    /**
     * Create a new resource conform to ORDS
     */
    constructor(name: string, schema: SchemaModels.Schema, acl: ResourceACL) {

        this.name = name;
        this.schema = schema;
        this.acl = acl;


        // read command: Do read ACL then do DB where Resource is added and do db reading comands
    }
}
