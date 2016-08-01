import * as express                     from 'express';
import {RoutingComponent}               from './lib/routing';
import {DependencyInjectorComponent}    from 'di-type';
import {Options}                        from './application.models';
import * as cors                        from 'cors';

/**
 * Worker for HL7 FHIR ORDS application
 */
export class Application {
    /**
     * Reference to routing component singleton
     */
    @DependencyInjectorComponent.inject(RoutingComponent)
    private rc: RoutingComponent;
    /**
     * Router
     */
    private router: express.Express;
    /**
     * Start the router to listen on incomming traffic
     * @param   {Options}     options     the options specificing how to listen
     * @returns {void}
     */
    constructor(options: Options) {

        // init instance of router
        this.router = express();

        // calculate whitelist array and set as empty is not specified
        if (process.env.WHITELIST === undefined) {
            process.env.WHITELIST = '';
        }
        
        // setup the usage of the whitelist
        this.router.use(cors({
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Authentication'],
            credentials: true,
            origin: function (origin: string, callback: Function): void {
                callback(undefined, options.whitelist.indexOf(origin) !== -1);
            }
        }));

        // bind routers from routing component
        this.router.use(options.prefix, this.rc._routers.system);
        this.router.use(options.prefix, this.rc._routers.resource);

        // start to listen for input
        this.router.listen(options.port);
    }
}
