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
    public create: HookableModels.All<RoutingModels.Request>;
    /**
     * Read something from the database
     */
    public read: HookableModels.All<RoutingModels.Request>;
    /**
     * Update something in the database
     */
    public update: HookableModels.All<RoutingModels.Request>;
    /**
     * Create something in the database
     */
    public delete: HookableModels.All<RoutingModels.Request>;
    /**
     * Read history of something in the database
     */
    public history: HookableModels.All<RoutingModels.Request>;
    /**
     * Patch something in the database
     */
    public patch: HookableModels.All<RoutingModels.Request>;
    /**
     * Create new instance of DBManager and bind middleware to it
     */
    constructor(hc: HookableComponent) {

        // init hookable
        this.create = hc.threeLayer<RoutingModels.Request>();
        this.read = hc.threeLayer<RoutingModels.Request>();
        this.update = hc.threeLayer<RoutingModels.Request>();
        this.delete = hc.threeLayer<RoutingModels.Request>();
        this.history = hc.threeLayer<RoutingModels.Request>();
        this.patch = hc.threeLayer<RoutingModels.Request>();

    }
}
