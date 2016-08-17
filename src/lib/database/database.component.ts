import {HookableComponent, HookableModels}  from 'make-it-hookable';
import {QueryBase}                          from './models/query-base';
import {DataManipulation}                   from './models/data-manipulation';
import {RecordRemoval}                      from './models/record-removal';

/**
 * Connect to a database and perform operation in that
 */
export class DatabaseComponent {
    /**
     * Create something in the database
     */
    public create: HookableModels.ReturnableAll<DataManipulation, any> = HookableComponent.returnableAll();
    /**
     * Read something from the database
     */
    public read: HookableModels.ReturnableAll<QueryBase, Array<any>> = HookableComponent.returnableAll();
    /**
     * Update something in the database
     */
    public update: HookableModels.ReturnableAll<DataManipulation, any> = HookableComponent.returnableAll();
    /**
     * Create something in the database
     */
    public delete: HookableModels.ReturnableAll<RecordRemoval, any> = HookableComponent.returnableAll();
    /**
     * Read history of something in the database
     */
    public history: HookableModels.ReturnableAll<QueryBase, Array<any>> = HookableComponent.returnableAll();
    /**
     * Patch something in the database
     */
    public patch: HookableModels.ReturnableAll<DataManipulation, any> = HookableComponent.returnableAll();
}
