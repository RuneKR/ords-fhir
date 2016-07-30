import * as express                     from 'express';
import {ApplicationRouting}             from './application.routing';
import {DependencyInjectorComponent}    from 'di-type';
import {Options}                        from './application.models';

/**
 * Worker for HL7 FHIR ORDS application
 */
export class Application {
    /**
     * Reference to routing component singleton
     */
    @DependencyInjectorComponent.inject(ApplicationRouting)
    private appRouting: ApplicationRouting;
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
        this.router.use(options.prefix, this.appRouting._systemRouter);
        this.router.use(options.prefix, this.appRouting._resourceRouter);

        // start to listen for input
        this.router.listen(options.port);
    }
}
