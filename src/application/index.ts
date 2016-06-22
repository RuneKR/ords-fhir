import * as express                     from 'express';
import {RoutingComponent}               from '../components/routing';
import {DependencyInjectorComponent}    from '../components/dependency-injector';

// routes to be bootstrapped
import {Instance}      from './routes/Instance';
import {Type}          from './routes/Type';
import {System}        from './routes/System';

/**
 * Specification on how to run the application
 */
export interface Options {
    /**
     * Port to run the application
     */
    port: number;
    /**
     * Prefix to be added to all routes
     */
    prefix: string;
}

/**
 * Main ORDS FHIR application
 */
export class Application {
    /**
     * Reference to routing component singleton
     */
    @DependencyInjectorComponent.inject(RoutingComponent)
    private rc: RoutingComponent;
    /**
     * Instanciated routes
     */
    private routes: Array<any> = [];
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

        // set included routes
        this.routes.push(new System(), new Instance(), new Type());

        // init instance of router
        this.router = express();
        
        // bind app from route manager
        this.router.use(options.prefix, this.rc.router);
        
        // start to listen for input
        this.router.listen(options.port);
    }
}
