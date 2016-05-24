import {Router}                             from './Router';
import {DI}                                 from './DependencyInjector';
import {HookManager, Conformance}           from './HookManager';
import {ConformanceManager}                 from './ConformanceManager';

// auto load routes
import '../routes/TypeRoute';
import '../routes/SystemRoute';
import '../routes/InstanceRoute';

/**
 * Working child of the cluster
 * @class ChildWorker
 */
export class ChildWorker {
    /**
     * Reference to resourcemanager
     */
    @DI.inject(Router)
    private router: Router;
    /**
     * Reference to conformance manager
     */
    @DI.inject(ConformanceManager)
    private conformanceManager: ConformanceManager;
    /**
     * Reference to router
     */
    @DI.inject(HookManager)
    private hookManager: HookManager;
    /**
     * Startup all tasks for the worker 
     * @param   {IConformance}          conformance   conformance from the server
     */
    constructor(conformance: any) {

        // add hook
        this.hookManager.addHookPre(
            'conformance.configure',
            'auto-core-conformance',
            this.conformanceManager.addAutoConformance
        );
        
        // add hook
        this.hookManager.addHookPer(
            'conformance.configure',
            'auto-core-conformance-build',
            this.conformanceManager.buildConformance
        );
        
        // build conformance
        this.hookManager.doHooks('conformance.configure', conformance).then((conf: Conformance.Configure): void => {

            // start http server when conformance is build
            this.router.listen(process.env.PORT);

        }).catch((err: any) => {

            // read err loud
            console.log(err);

            // kill worker
            process.exit(1);

        });
    }
}
