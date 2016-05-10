import * as Router                          from 'express';
import * as cors                            from 'cors';
import {TypeRoute}                          from '../routes/TypeRoute';
import * as cf                              from '../resources/Conformance';
import {InstanceRoute}                      from '../routes/InstanceRoute';
import {DI}                                 from './DependencyInjector';
import {HookManager}                        from './HookManager';
import {Enforce}                            from 'ts-objectschema';

/**
 * Working child of the cluster
 * @class ChildWorker
 */
@DI.inject(Router, HookManager)
export class ChildWorker {
    /**
     * Reference to router
     */
    private router: Router.Express;
    /**
     * Reference to router
     */
    private hookManager: HookManager;
    /**
     * Startup all tasks for the worker 
     * @param   {Array<ModuleConfig>}       modules   modules and be instanceiated and their config
     */
    constructor(conformance: cf.IConformance) {

        // adding for conformance
        this.hookManager.addHook('conformance', 'build', this.buildConformance.bind(this));

        // setup route hooks
        this.hookManager.addHook('routes.configure', 'filterRequest', this.SetUpRawRequestFiltering.bind(this));
        this.hookManager.addHook('routes.configure', 'addFhirRoutes', this.addFhirRoutes.bind(this));
        
        // set default values in conformance
        conformance.acceptUnknown = false;  // etc

        // do hooks 
        this.hookManager.doHooks('routes.configure', this.router);
        this.hookManager.doHooks('conformance', conformance);

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
        router.use('/api/', new TypeRoute().route);
        router.use('/api/', new InstanceRoute().route);

        // go next
        next(router);
    }
    /**
     * Build conformance baased on the input
     * @param   {Function}          next         next function in hook routes.configure
     * @param   {IConformance}      conformance  the conformance that are to be builded
     * @returns {void}              no feedback is provided
     */
    private buildConformance(next: Function, conformance: cf.IConformance): void {

        // Læs alle models ind så de kan oprettes som structure defenition i conformance
        
        // listen kan hentes via dBManager.models
        
        cf.conformance = new cf.Conformance(conformance, Enforce.required); 
        
    }
}
