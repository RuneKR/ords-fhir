import {RoutingConfig, RoutingModels}        from '../../lib/client-connection/routing';
import {ConformanceComponent}                from '../../lib/conformance';
import {Component}                           from 'di-type';
import {HookableModels}                      from 'make-it-hookable';

/**
 * HL7 FHIR instance interactions
 */
@Component({
    directives: [ConformanceComponent],
    providers: [RoutingConfig]
})
export class System {
    /**
     * Reference to conformance
     */
    private rsc: ConformanceComponent;
    /**
     * Binding the routes their function
     */
    constructor(config: RoutingConfig, rsc: ConformanceComponent) {

        // bind reference
        this.rsc = rsc;

        // bind to router
        config.addToSystem(
            {
                httpmethod: 'GET',
                path: '/metadata',
                protected: false
            },
            this.displayConStatement.bind(this)
        );
        config.addToSystem(
            {
                httpmethod: 'OPTIONS',
                path: '/',
                protected: false
            },
            this.displayConStatement.bind(this)
        );
    }
    /**
     * Display the conformance statement
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    public displayConStatement(req: RoutingModels.Request, res: RoutingModels.Response, next: HookableModels.ArgumentableCb): void {

        // set meta if needed
        if (this.rsc.conformance.meta) {

            // set response headers of version
            if (this.rsc.conformance.meta.versionId) {
                res.set({
                    'ETag': 'W/"' + this.rsc.conformance.meta.versionId + '"'
                });
            }

            // set response headers of last updated
            if (this.rsc.conformance.meta.lastUpdated) {
                res.set({
                    'Last-Modified': this.rsc.conformance.meta.lastUpdated
                });
            }
        }

        res.send(this.rsc.conformance);

        next();
    }
}
