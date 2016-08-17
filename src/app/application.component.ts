import * as express                     from 'express';
import {RoutingComponent}               from './lib/routing';
import {Component}                      from 'di-type';
import * as cors                        from 'cors';
import {Constants}                      from './shared/services/constants';

/**
 * Worker for HL7 FHIR ORDS application
 */
@Component({
    directives: [RoutingComponent],
    providers: []
})
export class Application {
    /**
     * Router
     */
    private router: express.Express;
    /**
     * Start the router to listen on incomming traffic
     * @returns {void}
     */
    constructor(rc: RoutingComponent) {

        // init instance of router
        this.router = express();
        
        // setup the usage of the whitelist
        this.router.use(cors({
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Authentication'],
            credentials: true,
            origin: function (origin: string, callback: Function): void {
                callback(undefined, Constants.WHITELIST.indexOf(origin) !== -1);
            }
        }));

        // bind routers from routing component
        this.router.use(rc._routers.system);
        this.router.use(rc._routers.resource);

        // start to listen for input
        this.router.listen(Constants.PORT);
    }
}
