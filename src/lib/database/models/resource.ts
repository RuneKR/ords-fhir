import {SchemaModels}           from 'simple-ts-schema';
import {QueryBase}              from './query-base';

export class ACL {
    /**
     * Limit read operations in the database
     */
    public Read(query: QueryBase): void {

        // do something here like updating the content
    }
}

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
     * Control the operations for this resource
     */
    public acl: ACL;
    /**
     * Create a new resource conform to ORDS
     */
    constructor(data: Resource) {
        
        this.name = data.name;
        this.schema = data.schema;
        this.acl = data.acl;
    }
}
