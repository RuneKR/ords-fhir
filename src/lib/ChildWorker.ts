/// <reference path='../../typings/tsd.d.ts' />

import * as express           from 'express';
import * as cors              from 'cors';
import {TypeRoute}            from '../routes/TypeRoute';
import {InstanceRoute}        from '../routes/InstanceRoute';
import {ModuleConfig}         from './Interfaces';
import {hm}                   from './HookManager';

/**
 * Working child of the cluster
 * @class ChildWorker
 */
export class ChildWorker {
    /**
     * Main router
     */
    private router: express.Express = express();
    /**
     * Startup all tasks for the worker 
     * @param   {Array<ModuleConfig>}       modules   modules and be instanceiated and their config
     */
    constructor(modules: Array<ModuleConfig>) {

        // do loading of modules
        this.loadModules(modules);

        // setup route hooks
        hm.addHook('routes.configure', 'filterRequest', this.SetUpRawRequestFiltering.bind(this));
        hm.addHook('routes.configure', 'addFhirRoutes', this.addFhirRoutes.bind(this));

        // do hooks for routing
        hm.doHooks('routes.configure', this.router);

        // start http server
        this.router.listen(process.env.PORT);
    }
    /**
     * Load all installed modules and supply the HookManager singleton and their config to them
     * @param   {Array<ModuleConfig>}       modules   modules and be instanceiated and their config
     * @returns {void}                      no feedback is provided  
     */
    private loadModules(modules: Array<ModuleConfig>): void {

        // external modules temp holder for loading them
        let tmp: any;
        let tmpInst: any;

        // load external modules and provide config and hooks to them
        modules.forEach((plugin: ModuleConfig) => {
            tmp = require(plugin.module).instance;
            tmpInst = new tmp(plugin.config, hm);
        });
    }
    /**
     * Setup raw filtering of incomming requests based on allwed origins and request headers
     * @param   {Function}       next   next function in hook routes.configure
     * @returns {void}                  no feedback is provided
     */
    private SetUpRawRequestFiltering(next: Function): void {

        // setup cors
        this.router.use(cors({
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Authentication'],
            credentials: true,
            origin: function (origin: string, callback: Function): void {
                callback(undefined, process.env.WHITELIST.indexOf(origin) !== -1);
            }
        }));

        // go next
        next(this.router);
    }
    /**
     * Adds FHIR routes to the router
     * @param   {Function}       next   next function in hook routes.configure
     * @returns {void}                  no feedback is provided
     */
    private addFhirRoutes(next: Function): void {

        // setup routs
        this.router.use('/api/', new TypeRoute().route);
        this.router.use('/api/', new InstanceRoute().route);

        // go next
        next(this.router);
    }
}
