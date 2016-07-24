import * as express                     from 'express';
import {RoutingComponent}               from './framework/routing';
import {DependencyInjectorComponent}    from './lib/dependency-injector';
import {Options}                        from './application.models';

/**
 * Worker for HL7 FHIR ORDS application
 */
export class ApplicationHelper {
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

        // bind routers from routing component
        this.router.use(options.prefix, this.rc.systemRouter);
        this.router.use(options.prefix, this.rc.resourceRouter);

        // start to listen for input
        this.router.listen(options.port);
    }
}