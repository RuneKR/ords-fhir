/// <reference path='../../typings/tsd.d.ts' />

import * as express     from 'express';
import * as cors        from 'cors';
import {con}            from './Connection';
import {TypeRoute}      from '../routes/TypeRoute';
import {InstanceRoute}  from '../routes/InstanceRoute';
import {StringMapAny}   from './Interfaces';
import {hook}           from './Hook';

/**
 * Module config syntax
 */
export interface ModuleConfig {
    config: StringMapAny;
    module: string; 
}

/**
 * Working child of the cluster with the http and https webserver
 */
export class ChildWorker {

    /**
     * main express application
     */
    private app: express.Express;

    /**
     * Start an express application on a https server and configure mongoose and aws
     */
    constructor(modules: Array<ModuleConfig>) { // correct from any

        // init express
        this.app = express();

        // setup cors
        this.app.use(cors({
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Authentication'],
            credentials: true,
            origin: function(origin: string, callback: Function): void {
                callback(undefined, process.env.WHITELIST.indexOf(origin) !== -1);
            }
        }));

        // external modules temp holder for loading them
        let tmp: any;

        // load external modules as singletons and provide config and hooks to them
        modules.forEach((plugin: ModuleConfig) => {
            tmp = require(plugin.module).instance;
            tmp.init(plugin.config, hook);
        });

        // do connection
        hook.doHooks('connectToDatabase', con);
        
        // setup routes
        hook.addHook('addRoutes', 'FHIRrestRoutes', this.addRoutes);

        // do routes
        hook.doHooks('addRoutes', this.app);

        // start http server
        this.app.listen(process.env.PORT);
    }
    public addRoutes(app: express.Express): void {
        
        // setup routs
        app.use('/api/', new TypeRoute().route);
        app.use('/api/', new InstanceRoute().route);
    }

}
