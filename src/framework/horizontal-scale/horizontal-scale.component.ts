import * as cluster                     from 'cluster';
import * as os                          from 'os';
import {SlaveByProcessid}               from './models/slave-by-processid';
import {Slave}                          from './models/slave';

/**
 * Scaling with hardware component
 */
export class HorizontalScaleComponent<T extends Slave> {
    /**
     * Active slaves by their process id
     * @type {SlaveByProcessid}
     */
    public slaves: SlaveByProcessid;
    /**
     * Childworker attached to the process
     * @type {ChildWorker}
     */
    public slave: T;
    /**
     * Generate a new Worker on each cpu and attach elements from the config variables to them as enviroment variables
     * @param {StringMapAny}    config      configuration for ords-fhir
     */
    constructor(slave: T, ...args: Array<any>) {

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
            this.slave = Object.create(slave.prototype);

            // set arguments
            slave.apply(this.slave, args);
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


