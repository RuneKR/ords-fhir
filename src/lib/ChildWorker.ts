import * as Router                          from 'express';
import * as cors                            from 'cors';
import {IConformanceConfig, IConformance}   from '../resources/Conformance';

import {TypeRoute}                          from '../routes/TypeRoute';
import {SystemRoute}                        from '../routes/SystemRoute';
import {InstanceRoute}                      from '../routes/InstanceRoute';

import {DI}                                 from './DependencyInjector';

import {HookManager}                        from './HookManager';
import {ResourceManager}                    from './ResourceManager';

/**
 * Working child of the cluster
 * @class ChildWorker
 */
@DI.inject(Router, HookManager, ResourceManager)
export class ChildWorker {
    /**
     * Reference to resourcemanager
     */
    private router: Router.Express;
    /**
     * Reference to router
     */
    private resourceManager: ResourceManager;
    /**
     * Reference to router
     */
    private hookManager: HookManager;
    /**
     * Startup all tasks for the worker 
     * @param   {Array<ModuleConfig>}       modules   modules and be instanceiated and their config
     */
    constructor(conformance: IConformanceConfig) {

        // setup route hooks
        this.hookManager.addHook('routes.configure', 'addRequestFilter', this.SetUpRawRequestFiltering.bind(this));
        this.hookManager.addHook('routes.configure', 'addFhirRoutes', this.addFhirRoutes.bind(this));

        // add routes
        this.hookManager.doHooks('routes.configure', this.router);
        
        // configure dbm. conformance should be generated after dbm has been configured 
        this.hookManager.doHooks('dbm.configure', this.resourceManager).then((): void => {
            
            // build conformance
            this.buildConformance(conformance);
            
        }).catch((): void => {
            
            // build conformance
            this.buildConformance(conformance);
        });

        // start http server
        this.router.listen(process.env.PORT);
    }
    /**
     * Setup raw filtering of incomming requests based on allwed origins and request headers
     * @param   {Function}          next    next function in hook routes.configure
     * @param   {Router.Router}     router  routing for the server
     * @returns {void}              no feedback is provided
     */
    private SetUpRawRequestFiltering(next: Function, router: Router.Router): void {

        // setup cors
        router.use(cors({
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Authentication'],
            credentials: true,
            origin: function (origin: string, callback: Function): void {
                callback(undefined, process.env.WHITELIST.indexOf(origin) !== -1);
            }
        }));

        // go next
        next(router);
    }
    /**
     * Adds FHIR routes to the router
     * @param   {Function}          next   next function in hook routes.configure
     * @param   {Router.Router}     router  routing for the server
     * @returns {void}              no feedback is provided
     */
    private addFhirRoutes(next: Function, router: Router.Router): void {

        // setup routs
        router.use('/api/', new SystemRoute().route);
        router.use('/api/', new TypeRoute().route);
        router.use('/api/', new InstanceRoute().route);

        // go next
        next(router);
    }
    /**
     * Build conformance based on the input
     * @param   {IConformanceConfig}      conformance  the conformance that are to be builded
     * @returns {void} 
     */
    private buildConformance(conformance: IConformanceConfig): void {

        this.hookManager.doHooks('conformance.configure', conformance).then((conf: IConformance): void => {
                
                // build conformance
                this.resourceManager.buildConformance(conf);
        }).catch((conf: IConformance): void => {
                
                // build conformance
                this.resourceManager.buildConformance(conf);
        });
    }
}
