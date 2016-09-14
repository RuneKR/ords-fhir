import {HookableModels}                     from 'make-it-hookable';
import {QueryBase}                          from './query-base';
import {DataManipulation}                   from './data-manipulation';
import {RecordRemoval}                      from './record-removal';

/**
 * Operations supported in the implementation
 */
export interface DBOperations {
    /**
     * Create something in the database
     */
    create: HookableModels.ReturnableAll<DataManipulation, any>;
    /**
     * Read something from the database
     */
    read: HookableModels.ReturnableAll<QueryBase, Array<any>>;
    /**
     * Update something in the database
     */
    update: HookableModels.ReturnableAll<DataManipulation, any>;
    /**
     * Create something in the database
     */
    delete: HookableModels.ReturnableAll<RecordRemoval, any>;
    /**
     * Read history of something in the database
     */
    history: HookableModels.ReturnableAll<QueryBase, Array<any>>;
    /**
     * Patch something in the database
     */
    patch: HookableModels.ReturnableAll<DataManipulation, any>;
}

