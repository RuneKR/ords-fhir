import {RoutingModels}                      from '../routing';
import {HookableComponent, HookableModels}  from '../hookable';
import {DependencyInjectorComponent}        from '../dependency-injector';

/**
 * Connect to a database and perform operation in that
 */
@DependencyInjectorComponent.createWith(HookableComponent)
export class DatabaseComponent {
    /**
     * Create something in the database
     */
    public create: HookableModels.ReturnableAll<RoutingModels.Request, any>;
    /**
     * Read something from the database
     */
    public read: HookableModels.ReturnableAll<RoutingModels.Request, Array<any>>;
    /**
     * Update something in the database
     */
    public update: HookableModels.ReturnableAll<RoutingModels.Request, any>;
    /**
     * Create something in the database
     */
    public delete: HookableModels.ReturnableAll<RoutingModels.Request, any>;
    /**
     * Read history of something in the database
     */
    public history: HookableModels.ReturnableAll<RoutingModels.Request, Array<any>>;
    /**
     * Patch something in the database
     */
    public patch: HookableModels.ReturnableAll<RoutingModels.Request, any>;
    /**
     * Create new instance of DBManager and bind middleware to it
     */
    constructor(hc: HookableComponent) {

        // init hookable
        this.create     = hc.returnableAll();
        this.read       = hc.returnableAll();
        this.update     = hc.returnableAll();
        this.delete     = hc.returnableAll();
        this.history    = hc.returnableAll();
        this.patch      = hc.returnableAll();

    }
}
