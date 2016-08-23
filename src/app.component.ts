import * as cors                            from 'cors';
import {Component}                          from 'di-type';
import {Constants}                          from './shared/services/constants';
import {RoutingComponent}                   from './lib/routing';
import * as express                         from 'express';

/**
 * Initialize client connection methods supported in ORDS
 */
@Component({
    directives: [Constants, RoutingComponent],
    providers: []
})
export class AppComponent {
    /**
     * Startup the client connections
     */
    constructor(constants: Constants, routing: RoutingComponent) {
        
        // init instance of router
        let router: express.Express = express();
        
        // setup the usage of the whitelist
        router.use(cors({
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Authentication'],
            credentials: true,
            origin: function (origin: string, callback: Function): void {
                callback(undefined, constants.WHITELIST.indexOf(origin) !== -1);
            }
        }));

        // bind routers from routing component
        router.use(routing._routers.system);
        router.use(routing._routers.resource);
 
        // start to listen for input
        router.listen(constants.PORT);
    }
}
