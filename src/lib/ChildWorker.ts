import * as express           from 'express';
import * as cors              from 'cors';
import {TypeRoute}            from '../routes/TypeRoute';
import {InstanceRoute}        from '../routes/InstanceRoute';
import {hm}                   from './HookManager';
import {DI}                   from './DenpendenyInjector';

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
export class ChildWorker {
    /**
     * Startup all tasks for the worker 
     * @param   {Array<ModuleConfig>}       modules   modules and be instanceiated and their config
     */
    constructor(modules: Array<ModuleConfig>, resources: Array<any>) {

        // setup route hooks
        hm.addHook('routes.configure', 'filterRequest', this.SetUpRawRequestFiltering.bind(this));
        hm.addHook('routes.configure', 'addFhirRoutes', this.addFhirRoutes.bind(this));

        // remove not needed resources
        this.updateResources(resources);

        // do loading of modules
        this.loadModules(modules);

        // do hooks for routing
        hm.doHooks('routes.configure', DI.dbm.models);

        // start http server
        DI.router.listen(process.env.PORT);
    }
    /**
     * Load all installed modules and supply the HookManager singleton and their config to them
     * @param   {Array<ModuleConfig>}       modules   modules and be instanceiated and their config
     * @returns {void}                      no feedback is provided  
     */
    private loadModules(modules: Array<ModuleConfig>): void {

        // external modules temp holder for loading them
        let plugin: any;
        let scope: any;
        let dependencies: Array<any>;

        // load external modules and provide config and hooks to them
        for (let entry of modules) {

            // update ref to plugin
            plugin = entry.module.instance;

            // update dependencies
            dependencies = DI.getInjects(entry.module.dependencies);

            // put in config
            dependencies.unshift(entry.config);

            // create tmp scope
            scope = Object.create(plugin.prototype);

            // create new instance of the dependency and keep reference to it
            DI[entry.module.name] = plugin.apply(scope, dependencies);
        }
    }
    /**
     * Setup raw filtering of incomming requests based on allwed origins and request headers
     * @param   {Function}          next    next function in hook routes.configure
     * @param   {express.Express}   router  routing for the server
     * @returns {void}              no feedback is provided
     */
    private SetUpRawRequestFiltering(next: Function, router: express.Router): void {

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
     * @param   {express.Express}   router  routing for the server
     * @returns {void}              no feedback is provided
     */
    private addFhirRoutes(next: Function, router: express.Router): void {

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

        for (let model of filter) {
            newModelMap[functionName(model)] = model;
        }

        // only update reference if anything is applied in filter
        if (filter.length !== 0) {
            DI.dbm.models = newModelMap;
        }
    }
}
