import * as Router            from 'express';
import * as cors              from 'cors';
import {TypeRoute}            from '../routes/TypeRoute';
import {InstanceRoute}        from '../routes/InstanceRoute';
import {DI}                   from './DependencyInjector';
import {HookManager}          from './HookManager';

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
    constructor() {

        // setup route hooks
        this.hookManager.addHook('routes.configure', 'filterRequest', this.SetUpRawRequestFiltering.bind(this));
        this.hookManager.addHook('routes.configure', 'addFhirRoutes', this.addFhirRoutes.bind(this));

        // do hooks for routing
        this.hookManager.doHooks('routes.configure', this.router);

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
}
