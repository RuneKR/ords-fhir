import {RoutingModels}                      from '../routing';
import {HookableComponent, HookableModels}  from '../../lib/hookable';
import {DependencyInjectorComponent}        from '../../lib/dependency-injector';

/**
 * Connect to a database and perform operation in that
 */
@DependencyInjectorComponent.createWith()
export class DatabaseComponent {
    /**
     * Create something in the database
     */
    public create: HookableModels.ReturnableAll<RoutingModels.Request, any> = HookableComponent.returnableAll();
    /**
     * Read something from the database
     */
    public read: HookableModels.ReturnableAll<RoutingModels.Request, Array<any>> = HookableComponent.returnableAll();
    /**
     * Update something in the database
     */
    public update: HookableModels.ReturnableAll<RoutingModels.Request, any> = HookableComponent.returnableAll();
    /**
     * Create something in the database
     */
    public delete: HookableModels.ReturnableAll<RoutingModels.Request, any> = HookableComponent.returnableAll();
    /**
     * Read history of something in the database
     */
    public history: HookableModels.ReturnableAll<RoutingModels.Request, Array<any>> = HookableComponent.returnableAll();
    /**
     * Patch something in the database
     */
    public patch: HookableModels.ReturnableAll<RoutingModels.Request, any> = HookableComponent.returnableAll();
}
