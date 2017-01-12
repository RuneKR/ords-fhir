import * as cors from 'cors';
import { Component } from 'di-type';
import { RoutingHooks } from 'ords-db';
import { AppConfig } from './app.config';

/**
 * Initialize client connection methods supported in ORDS fhir
 */
@Component({
    directives: [RoutingHooks, AppConfig],
    providers: []
})
export class Application {
    /**
     * Startup the client connections
     */
    constructor(hooks: RoutingHooks, cfg: AppConfig) {

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
