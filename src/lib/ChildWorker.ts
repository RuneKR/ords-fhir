import {Router}                from './Router';
import {DI}                    from './DependencyInjector';
import {HookManager}           from './HookManager';

// auto internal components
import '../routes/TypeRoute';
import '../routes/SystemRoute';
import '../routes/InstanceRoute';
import './ConformanceManager';

/**
 * Working child of the cluster
 * @class ChildWorker
 */
export class ChildWorker {
    /**
     * Reference to router
     */
    @DI.inject(Router)
    private router: Router;
    /**
     * Reference to the hookmanager
     */
    @DI.inject(HookManager)
    private hookManager: HookManager;
    /**
     * Startup all tasks for the worker 
     * @param   {IConformance}          conformance   conformance from the server
     */
    constructor(conformance: any) {
        
        // build conformance and then start the server
        this.hookManager.doHooks('conformance.configure', conformance).then((): void => {

            // start http server when conformance is build
            this.router.listen(process.env.PORT);

        // stop the server from starting
        }).catch((err: any) => {

            // read err loud
            console.log(err);
            
            // kill the marster and all sub procces
            process.send({cmd: 'terminate'});
        });
    }
}
