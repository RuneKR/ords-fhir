import {DBOperations}           from './db-operations';
import {QueryBase}              from './query-base';
import {RecordRemoval}          from './record-removal';
import {DataManipulation}       from './data-manipulation';
import {HookableModels}         from 'make-it-hookable';

export interface ResourceACL extends DBOperations {
    /**
     * Create something in the database
     */
    create: HookableModels.Returnable<DataManipulation, any>;
    /**
     * Read something from the database
     */
    read: HookableModels.Returnable<QueryBase, Array<any>>;
    /**
     * Update something in the database
     */
    update: HookableModels.Returnable<DataManipulation, any>;
    /**
     * Create something in the database
     */
    delete: HookableModels.Returnable<RecordRemoval, any>;
    /**
     * Read history of something in the database
     */
    history: HookableModels.Returnable<QueryBase, Array<any>>;
    /**
     * Patch something in the database
     */
    patch: HookableModels.Returnable<DataManipulation, any>;
}