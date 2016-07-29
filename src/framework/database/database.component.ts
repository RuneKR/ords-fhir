import {Request}                            from 'express';
import {HookableComponent, HookableModels}  from 'make-it-hookable';

/**
 * Connect to a database and perform operation in that
 */
export class DatabaseComponent {
    /**
     * Create something in the database
     */
    public create: HookableModels.ReturnableAll<Request, any> = HookableComponent.returnableAll();
    /**
     * Read something from the database
     */
    public read: HookableModels.ReturnableAll<Request, Array<any>> = HookableComponent.returnableAll();
    /**
     * Update something in the database
     */
    public update: HookableModels.ReturnableAll<Request, any> = HookableComponent.returnableAll();
    /**
     * Create something in the database
     */
    public delete: HookableModels.ReturnableAll<Request, any> = HookableComponent.returnableAll();
    /**
     * Read history of something in the database
     */
    public history: HookableModels.ReturnableAll<Request, Array<any>> = HookableComponent.returnableAll();
    /**
     * Patch something in the database
     */
    public patch: HookableModels.ReturnableAll<Request, any> = HookableComponent.returnableAll();
}
