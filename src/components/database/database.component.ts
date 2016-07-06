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
    public create: HookableModels.All<RoutingModels.Request, any>;
    /**
     * Read something from the database
     */
    public read: HookableModels.All<RoutingModels.Request, Array<any>>;
    /**
     * Update something in the database
     */
    public update: HookableModels.All<RoutingModels.Request, any>;
    /**
     * Create something in the database
     */
    public delete: HookableModels.All<RoutingModels.Request, any>;
    /**
     * Read history of something in the database
     */
    public history: HookableModels.All<RoutingModels.Request, Array<any>>;
    /**
     * Patch something in the database
     */
    public patch: HookableModels.All<RoutingModels.Request, any>;
    /**
     * Create new instance of DBManager and bind middleware to it
     */
    constructor(hc: HookableComponent) {

        // init hookable
        this.create     = hc.threeLayer<RoutingModels.Request, any>();
        this.read       = hc.threeLayer<RoutingModels.Request, Array<any>>();
        this.update     = hc.threeLayer<RoutingModels.Request, any>();
        this.delete     = hc.threeLayer<RoutingModels.Request, any>();
        this.history    = hc.threeLayer<RoutingModels.Request, Array<any>>();
        this.patch      = hc.threeLayer<RoutingModels.Request, any>();

    }
}
