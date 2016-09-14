import {SchemaModels}           from 'simple-ts-schema';
import {QueryBase}              from './query-base';
import {RecordRemoval}          from './record-removal';
import {DataManipulation}       from './data-manipulation';

export class ACL {
    /**
    * Limit create operations on the resource
    */
    public create(query: DataManipulation): void {

        // do something here like updating the content
    }
    /**
     * Limit read operations on the resource
     */
    public read(query: QueryBase): void {

        // do something here like updating the content
    }
    /**
    * Limit update operations on the resource
    */
    public update(query: DataManipulation): void {

        // do something here like updating the content
    }
    /**
    * Limit delete operations on the resource
    */
    public delete(query: RecordRemoval): void {

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
