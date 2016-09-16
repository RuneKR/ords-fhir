import {DBOperations}                       from './models/db-operations';
import {QueryBase}                          from './models/query-base';
import {RecordRemoval}                      from './models/record-removal';
import {DataManipulation}                   from './models/data-manipulation';
import {HookableModels, HookableComponent}  from 'make-it-hookable';
import {Component}              from 'di-type';

@Component({
    directives: [],
    providers: []
})
export class DatabaseConfig implements DBOperations {
    /**
     * Create something in the database
     */
    public create: HookableModels.Returnable<DataManipulation, any> =  HookableComponent.returnableAll();
    /**
     * Read something from the database
     */
    public read: HookableModels.Returnable<QueryBase, Array<any>> =  HookableComponent.returnableAll();
    /**
     * Update something in the database
     */
    public update: HookableModels.Returnable<DataManipulation, any> =  HookableComponent.returnableAll();
    /**
     * Create something in the database
     */
    public delete: HookableModels.Returnable<RecordRemoval, any> =  HookableComponent.returnableAll();
    /**
     * Read history of something in the database
     */
    public history: HookableModels.Returnable<QueryBase, Array<any>> =  HookableComponent.returnableAll();
    /**
     * Patch something in the database
     */
    public patch: HookableModels.Returnable<DataManipulation, any> =  HookableComponent.returnableAll();
}
