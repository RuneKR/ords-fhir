import {HookableComponent, HookableModels}  from 'make-it-hookable';
import {DBOperations}                       from './models/db-operations';
import {QueryBase}                          from './models/query-base';
import {DataManipulation}                   from './models/data-manipulation';
import {RecordRemoval}                      from './models/record-removal';
import {Resource}                           from './models/Resource';
import {Component}                          from 'di-type';
import {SchemaModels}                       from 'simple-ts-schema';

/**
 * Connect to a database and perform operation in that
 */
@Component({
    directives: [],
    providers: []
})
export class DatabaseComponent implements DBOperations {
    /**
     * Create something in the database
     */
    public create: HookableModels.Returnable<DataManipulation, any> = HookableComponent.returnable();
    /**
     * Read something from the database
     */
    public read: HookableModels.Returnable<QueryBase, Array<any>> = HookableComponent.returnable();
    /**
     * Update something in the database
     */
    public update: HookableModels.Returnable<DataManipulation, any> = HookableComponent.returnable();
    /**
     * Create something in the database
     */
    public delete: HookableModels.Returnable<RecordRemoval, any> = HookableComponent.returnable();
    /**
     * Read history of something in the database
     */
    public history: HookableModels.Returnable<QueryBase, Array<any>> = HookableComponent.returnable();
    /**
     * Patch something in the database
     */
    public patch: HookableModels.Returnable<DataManipulation, any> = HookableComponent.returnable();
    /**
     * Create a new resource 
     */
    public createResource(name: string, schema: SchemaModels.Schema): Resource {


        // prepare resource
        let resource: Resource = new Resource(name, schema);

        // add reference to database as actors
        resource.create.actor       = this.create.actor;
        resource.read.actor         = this.read.actor;
        resource.update.actor       = this.update.actor;
        resource.delete.actor       = this.delete.actor;
        resource.history.actor      = this.history.actor;
        resource.patch.actor        = this.patch.actor;

        // return result
        return resource;
    }
}
