import {SchemaModels}           from 'simple-ts-schema';
import {DBOperations}           from './db-operations';
import {QueryBase}              from './query-base';
import {RecordRemoval}          from './record-removal';
import {DataManipulation}       from './data-manipulation';
import {HookableComponent, HookableModels}  from 'make-it-hookable';

export class Resource implements DBOperations {
    /**
     * Schema for this resource
     */
    public schema: SchemaModels.Schema;
    /**
     * Name of the resource
     */
    public name: string;
    /**
     * Create something in the database
     */
    public create:  HookableModels.ReturnableAll<DataManipulation, any> = HookableComponent.returnableAll();
    /**
     * Read something from the database
     */
    public read:    HookableModels.ReturnableAll<QueryBase, Array<any>> = HookableComponent.returnableAll();
    /**
     * Update something in the database
     */
    public update:  HookableModels.ReturnableAll<DataManipulation, any> = HookableComponent.returnableAll();
    /**
     * Create something in the database
     */
    public delete:  HookableModels.ReturnableAll<RecordRemoval, any> = HookableComponent.returnableAll();
    /**
     * Read history of something in the database
     */
    public history: HookableModels.ReturnableAll<QueryBase, Array<any>> = HookableComponent.returnableAll();
    /**
     * Patch something in the database
     */
    public patch:   HookableModels.ReturnableAll<DataManipulation, any> = HookableComponent.returnableAll();
    /**
     * Create a new resource conform to ORDS
     */
    constructor(name: string, schema: SchemaModels.Schema) {

        this.name = name;
        this.schema = schema;
    }
}
