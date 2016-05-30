import {Router}                 from './Router';
import {DI}                     from './DependencyInjector';
import {HookManager, Hookables} from './HookManager';

// bootstrap some components
import '../routes/SystemRoute';
import '../routes/TypeRoute';
import '../routes/InstanceRoute';
import './ConformanceManager';
import './DBManager';

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

        // init options with the supplied
        let options: Hookables.ConformanceManager.Build = {
            params: conformance,
            result: conformance
        };
        
        // build conformance and then start the server
        this.hookManager.doHooks<Hookables.ConformanceManager.Build>('ConformanceManager.Build', options)

            // if build is an succes then start the routing up
            .then((): void => {
                
                /*DEBUG
                let test: any = this.router;             
                console.log(test.app._router.stack);*/

                // start http server when conformance is build
                this.router.listen(process.env.PORT);

                // stop the server from starting
            }).catch((err: any) => {

                // read err loud
                console.log(err);

                // kill the marster and all sub procces
                process.send({ cmd: 'terminate' });
            });
    }
}
