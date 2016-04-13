/// <reference path='../../typings/tsd.d.ts' />

import * as express from 'express';
import * as cors from 'cors';
import {con} from './Connection';
import {TypeRoute} from './routes/TypeRoute';
import {InstanceRoute} from './routes/InstanceRoute';
import {hook} from './Hook';
import {KeyStringObject} from './Interfaces';

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
    constructor(modules: Array<KeyStringObject>) {

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

        // external
        let tmp: any;

        // load external modules as singletons and provide config and hooks to them
        modules.forEach((plugin: KeyStringObject) => {
            tmp = require(plugin['module']).instance;
            tmp.init(plugin['config'], hook);
        });

        // do connection
        hook.doHook('connectToDatabase', con);
        
        // setup routes
        hook.addHook('addRoutes', 'FHIRrestRoutes', this.addRoutes);

        // do routes
        hook.doHook('addRoutes', this.app);

        // start http server
        this.app.listen(process.env.PORT);
    }
    public addRoutes(app: express.Express): void {
        
        // setup routs
        app.use('/api/', new TypeRoute().route);
        app.use('/api/', new InstanceRoute().route);
    }

}
