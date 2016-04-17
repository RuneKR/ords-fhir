import * as cluster                 from 'cluster';
import * as os                      from 'os';
import {ChildWorker, ModuleConfig}  from './lib/ChildWorker';

/*
* Map with string as key and value as a clusterworker
*/
export interface NumberMapWorker {
    [key: number]: cluster.Worker;
}

/**
 * Configuration element of ords-fhir
 */
export interface Config {
    [key: string]: any;
    LIMIT_UPLOAD_MB: number;
    PORT: number;
    WHITELIST: Array<string>;
    modules: Array<ModuleConfig>;
}

/**
 * HL7 FHIR REST server main application
 * @class Server
 */
export class Server {
    /**
     * Active workers by their process id
     * @type {NumberMapWorker}
     */
    public activeWorkers: NumberMapWorker;
    /**
     * Childworker attached to the process
     * @type {ChildWorker}
     */
    public child: ChildWorker;
    /**
     * Creates a new worker on every cpu and attach env variables to them
     * @param {StringMapAny}    config      configuration for ords-fhir
     */
    constructor(config: Config) {

        // number of CPU on the system
        let numCPUs: number = os.cpus().length;

        // iterator key
        let i: number = 0;

        // see for modules
        let modules: Array<ModuleConfig> = config['modules'];
        delete config['modules'];

        // set process variables from configuration
        Object.keys(config).forEach((key: string) => {
            process.env[key] = config[key];
        });

        // check if worker forked by the cluster is a master
        if (cluster.isMaster) {

            // init a list of active workers
            this.activeWorkers = {};

            // begin to boot workers
            while (i < numCPUs) {

                // start worker
                let worker: any = cluster.fork();

                // save reference to worker
                this.activeWorkers[worker.process.pid] = worker;

                // iterate
                i++;
            }

            // bind exit function
            cluster.on('exit', (worker: cluster.Worker, code: number, signal: string) => this.rebootWorker(worker, code, signal));

            // none master but slave worker
        } else {

            // start child
            this.child = new ChildWorker(modules);
        }
    }
    /**
     * Rebooting worker and delete the old worker from list
     * @param {cluster.Worker}  worker  worker that is being terminated
     * @param {number}          code    code for termination
     * @param {string}          signal  descriptor of termination
     * @returns void            no feedback is provided
     */
    public rebootWorker(worker: cluster.Worker, code: number, signal: string): void {

        // remove from active worker pool
        delete this.activeWorkers[worker.process.pid];

        // reboot worker
        let child: cluster.Worker = cluster.fork();

        // save path to active worker
        this.activeWorkers[child.process.pid] = child;
    }
}
