import * as router            from 'express';
import {Router}               from './Router';
import * as cors              from 'cors';
import {TypeRoute}            from '../routes/TypeRoute';
import {InstanceRoute}        from '../routes/InstanceRoute';
import {DI}                   from './DependencyInjector';

// to be bootstrapped
import {HookManager}          from './HookManager';
import {DBManager}            from './DBManager';

/**
 * Configuration for every module
 */
export interface ModuleConfig {
    config: { [key: string]: any };
    module: {
        instance: any;
        name: string;
        dependencies: Array<string>;
    };
}

/**
 * Working child of the cluster
 * @class ChildWorker
 */
@DI.inject(Router, HookManager, DBManager)
export class ChildWorker {
    /**
     * Reference to router
     */
    private router: router.Express;
    /**
     * Reference to router
     */
    private hookManager: HookManager;
    /**
     * Reference to router
     */
    private dBManager: DBManager;
    /**
     * Startup all tasks for the worker 
     * @param   {Array<ModuleConfig>}       modules   modules and be instanceiated and their config
     */
    constructor(resources: Array<any>) {

        // setup route hooks
        this.hookManager.addHook('routes.configure', 'filterRequest', this.SetUpRawRequestFiltering.bind(this));
        this.hookManager.addHook('routes.configure', 'addFhirRoutes', this.addFhirRoutes.bind(this));

        // remove not needed resources
        this.updateResources(resources);

        // do hooks for routing
        this.hookManager.doHooks('routes.configure', this.router);

        // start http server
        this.router.listen(process.env.PORT);
    }
    /**
     * Setup raw filtering of incomming requests based on allwed origins and request headers
     * @param   {Function}          next    next function in hook routes.configure
     * @param   {express.Express}   router  routing for the server
     * @returns {void}              no feedback is provided
     */
    private SetUpRawRequestFiltering(next: Function, router: router.Router): void {

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
     * @param   {router.router}     router  routing for the server
     * @returns {void}              no feedback is provided
     */
    private addFhirRoutes(next: Function, router: router.Router): void {

        // setup routs
        router.use('/api/', new TypeRoute().route);
        router.use('/api/', new InstanceRoute().route);

        // go next
        next(router);
    }
    /**
     * Update the avalable resources in dbm based on the supplied filter
     * @param   {Array<any}      filter     array of new resources to be used
     * @returns {void}           no feedback is provided
     */
    private updateResources(filter: Array<any>): void {

        // get functionname based on a function
        let functionName: Function = function (fun: Function): string {

            let ret: string = fun.toString();
            ret = ret.substr('function '.length);
            ret = ret.substr(0, ret.indexOf('('));
            return ret;
        };

        // ref to new avalable resources
        let newModelMap: { [key: string]: any } = {};

        // save new resource
        for (let model of filter) {
            newModelMap[functionName(model)] = model;
        }

        // only update reference if anything is applied in filter
        if (filter.length !== 0) {

            // update models
            this.dBManager.models = newModelMap;
        }
    }
}
