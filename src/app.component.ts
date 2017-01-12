import * as cors from 'cors';
import { Component } from 'di-type';
import { RoutingHooks } from 'ords-db';
import { ApplicationConfig } from './app.config';

/**
 * This is the class to be bootstrapped
 */
@Component({
    directives: [RoutingHooks, ApplicationConfig],
    providers: []
})
export class Application {
    /**
     * Startup the client connections
     */
    constructor(hooks: RoutingHooks, cfg: ApplicationConfig) {

        // setup the usage of the whitelist
        hooks.routes.push({
            method: 'USE',
            path: '*',
            handlers: [cors({
                allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Authentication'],
                credentials: true,
                origin: function (origin: string, callback: Function): void {
                    callback(undefined, cfg.whitelist.indexOf(origin) !== -1);
                }
            })]
        });

    }
}
