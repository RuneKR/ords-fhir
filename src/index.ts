import * as cluster from 'cluster';
import * as os from 'os';
import {ChildWorker} from './lib/ChildWorker';
import {KeyStringObject} from './lib/interfaces';

/**
 * HL7 FHIR REST server main application
 * 
 * @class Server
 */
export class Server {
    /**
     * Container of active workers
     * 
     * @type {Stringclass}
     */
    public activeWorkers: KeyStringObject;
    
    /**
     * Container of child worker
     * 
     * @type {ChildWorker}
     */
    public child: ChildWorker;
 
    /**
     * Creates an instance of Server.
     */
    constructor(config: KeyStringObject) {

        // number of CPU on the system
        let numCPUs: number = os.cpus().length;

        // iterator key
        let i: number = 0;
        
        // see for modules
        let modules: Array<KeyStringObject> = config['modules'];
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
            cluster.on('exit', (worker: any, code: number, signal: string) => this.onExit(worker, code, signal));

        // none master but slave worker
        } else {

            // start child
            this.child = new ChildWorker(modules);
        }
    }
    
    /**
     * Rebooting worker and delete the old worker from list
     * 
     * @param {*} worker (description)
     * @param {number} code (description)
     * @param {string} signal (description)
     * @returns void
     */
    public onExit (worker: any, code: number, signal: string): void {

        // remove from active worker pool
        delete this.activeWorkers[worker.process.pid];

        // reboot worker
        let child: any = cluster.fork();

        // save path to active worker
        this.activeWorkers[child.process.pid] = child;
    }
}
