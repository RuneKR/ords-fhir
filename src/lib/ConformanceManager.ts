import {IConformance}               from '../models/internal/Conformance';
import {HookManager, Hookables}     from './HookManager';
import {DI}                         from './DependencyInjector';

/**
 * Manage every resource in the application
 */
export class ConformanceManager {
    /**
     * Instanceiated conformance resource
     */
    public conformance: IConformance;
    /**
     * Reference to router
     */
    @DI.inject(HookManager)
    private hookManager: HookManager;
    /**
     * add the hooks neccercy for conformance manager to work
     */
    constructor() {

        // add hook
        this.hookManager.addHookPer<Hookables.ConformanceManager.Build>(
            'ConformanceManager.Build',
            'auto-core-conformance-build',
            this.build.bind(this)
        );

        // ad hook
        this.hookManager.addHookPre<Hookables.ConformanceManager.Build>(
            'ConformanceManager.Build',
            'auto-core-conformance-build',
            this.addAutoConformance.bind(this)
        );
    }
    /**
     * Add some of the autogenerated conformance fields to the conformance
     * @param   {Hookables.ConformanceManager.Build}  options     conformance that needs the fields added
     * @param   {Function}                            next        function to be run the next time
     * @returns {Void}
     */
    public addAutoConformance(options: Hookables.ConformanceManager.Build, next: Function): void {

        // add the fields
        options.params.name = 'Main conformance statement';
        options.params.status = 'active';
        options.params.kind = 'instance';
        options.params.fhirVersion = 'v1.0.2-7202';
        options.params.acceptUnknown = 'no';
        options.params.format = ['json'];
        options.params.rest = {
            mode: 'server',
            searchParam: [
            ]
        };

        // do the next
        next();
    }
    /**
     * Build the conformance
     * @param   {Hookables.ConformanceManager.Build}  options     conformance that needs to be build
     * @returns {Void}
     */
    public build(options: Hookables.ConformanceManager.Build, next: Function): void {

        // some more fields should be added to the conformance here

        // generate profile etc     profile?: Array<IReference>;
        // build the conformance
        this.conformance = options.params;
        options.result = this.conformance;

        next();

        // this.conformance = new Conformance(conformance, Enforce.required);
    }
}
