/// <reference path='../../typings/tsd.d.ts' />

import * as express           from 'express';
import * as cors              from 'cors';
import {TypeRoute}            from '../routes/TypeRoute';
import {InstanceRoute}        from '../routes/InstanceRoute';
import {ModuleConfig}         from './Interfaces';
import {hm}                   from './HookManager';

/**
 * Working child of the cluster
 */
export class ChildWorker {
    /**
     * main express application
     */
    private router: express.Express = express();
    /**
     * Startup all tasks for the worker 
     */
    constructor(modules: Array<ModuleConfig>) {

        // do loading of modules
        this.loadModules(modules);
        
        // setup route hooks
        hm.addHook('routes.configure', 'filterRequest', this.filterRequest);
        hm.addHook('routes.configure', 'addFhirRoutes', this.addFhirRoutes);

        // do hooks for routing
        hm.doHooks('routes.configure', this.router);

        // start http server
        this.router.listen(process.env.PORT);
    }
    private filterRequest(next: Function, router: express.Express): void {
        
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
    private addFhirRoutes(next: Function, router: express.Express): void {
        
        // setup routs
        router.use('/api/', new TypeRoute().route);
        router.use('/api/', new InstanceRoute().route);
        
        next(router);
    }
}
