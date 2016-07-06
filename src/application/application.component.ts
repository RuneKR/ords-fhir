import * as express                     from 'express';
import {RoutingComponent}               from '../components/routing';
import {DependencyInjectorComponent}    from '../components/dependency-injector';
import * as cluster                     from 'cluster';
import * as os                          from 'os';

// routes to be bootstrapped
import {Instance}      from './routes/Instance';
import {Type}          from './routes/Type';
import {System}        from './routes/System';

// bootstrapped
import './middleware/database';
import './middleware/routing';

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

/*
* Map with number as key and value as a cluster.Worker
*/
export interface SlaveByProcessid {
    [key: number]: cluster.Worker;
}

/**
 * HL7 FHIR REST server main application
 * @class Application
 */
export class Application {
    /**
     * Active workers by their process id
     * @type {SlaveByProcessid}
     */
    public slaves: SlaveByProcessid;
    /**
     * Childworker attached to the process
     * @type {ChildWorker}
     */
    public slave: Slave;
    /**
     * Generate a new Worker on each cpu and attach elements from the config variables to them as enviroment variables
     * @param {StringMapAny}    config      configuration for ords-fhir
     */
    constructor(config: Options) {

        // check if worker forked by the cluster is a master
        if (cluster.isMaster) {

            // init a list of active workers
            this.slaves = {};

            // number of CPU on the system
            let numCPUs: number = os.cpus().length;

            // iterator key
            let i: number = 0;

            // begin to boot workers
            while (i < numCPUs) {

                // start worker
                let worker: any = cluster.fork();

                // terminate everything if needed by one worker
                worker.on('message', (msg: any) => {

                    // terminate clean if cmd is terminate
                    if (msg.cmd === 'terminate') {
                        process.exit(0);
                    }
                });

                // save reference to worker
                this.slaves[worker.process.pid] = worker;

                // iterate
                i++;
            }

            // bind exit function
            cluster.on('exit', (worker: cluster.Worker) => this.rebootSlaves(worker));

            // none master but slave worker
        } else {

            // start child
            this.slave = new Slave(config);
        }
    }
    /**
     * Rebooting the slaves worker and delete the old worker from list
     * @param {cluster.Worker}  worker  worker that is being terminated
     * @returns void            no feedback is provided
     */
    public rebootSlaves(worker: cluster.Worker): void {

        // remove from active worker pool
        delete this.slaves[worker.process.pid];

        // reboot worker
        let child: cluster.Worker = cluster.fork();

        // save path to active worker
        this.slaves[child.process.pid] = child;
    }
}

/**
 * Worker for HL7 FHIR ORDS application
 */
export class Slave {
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
