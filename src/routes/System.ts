// external
import { Component } from 'di-type';

// internal
import { RoutingHooks, RoutingLib } from 'ords-db';
import { Conformance, ConformanceLib } from '../conformance';

// include reference to conformance and update the conformance with functions added in this routes

/**
 * HL7 FHIR instance interactions
 */
@Component({
    directives: [Conformance],
    providers: [RoutingHooks]
})
export class System {
    /**
     * Reference to conformance
     */
    private rsc: ConformanceComponent;
    /**
     * Binding the routes their function
     */
    constructor(config: RoutingHooks, rsc: Conformance) {

        // bind reference
        this.rsc = rsc;

        // bind to router
        config.routes.push(
            {
                method: 'GET',
                path: '/metadata',
                handlers: [this.displayConStatement.bind(this)]
            }
        );
        config.routes.push(
            {
                method: 'OPTIONS',
                path: '/',
                handlers: [this.displayConStatement.bind(this)]
            }
        );
    }
    /**
     * Display the conformance statement
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    public displayConStatement(req: RoutingLib.Request, res: RoutingLib.Response, next: Error | any): void {

        let conformance: ConformanceLib.Schemas.IConformance = this.rsc.getConformance();

        // set meta if needed
        if (conformance.meta) {

            // set response headers of version
            if (conformance.meta.versionId) {
                res.set({
                    'ETag': 'W/"' + conformance.meta.versionId + '"'
                });
            }

            // set response headers of last updated
            if (conformance.meta.lastUpdated) {
                res.set({
                    'Last-Modified': conformance.meta.lastUpdated
                });
            }
        }

        res.send(this.rsc.conformance);

        next();
    }
}
