import {RoutingComponent}                    from '../lib/routing';
import {ConformanceComponent}                from '../lib/conformance';
import {DependencyInjectorComponent}         from 'di-type';
import {Schemas}                             from '../shared/models/hl7-fhir';
import {Request, Response}                   from '../shared/models/client-interaction';
import {HookableModels}                      from 'make-it-hookable';
import {Constants}                           from '../shared/services/constants';

/**
 * HL7 FHIR instance interactions
 */
export class System {
    /**
     * Reference to conformance
     */
    @DependencyInjectorComponent.inject(ConformanceComponent)
    private rsc: ConformanceComponent;
    /**
     * Reference to route component
     */
    @DependencyInjectorComponent.inject(RoutingComponent)
    private rm: RoutingComponent;
    /**
     * Binding the routes their function
     */
    constructor() {

        // bind to router
        this.rm.addToSystem(
            {
                httpmethod: 'GET',
                path: '/metadata',
                protected: false
            },
            this.displayConStatement.bind(this)
        );
        this.rm.addToSystem(
            {
                httpmethod: 'OPTIONS',
                path: '/',
                protected: false
            },
            this.displayConStatement.bind(this)
        );
        this.rm.addToSystem(
            {
                httpmethod: 'GET',
                path: Constants.SYSTEM_STRUCTURE_DEFINITION_RELATIVE_URI + '/:resource',
                protected: false
            },
            this.displayStructureDef.bind(this)
        );
        this.rm.addToSystem(
            {
                httpmethod: 'GET',
                path: Constants.SYSTEM_VALUE_SET_RELATIVE_URI + '/:resource',
                protected: false
            },
            this.displayValueset.bind(this)
        );
    }
    /**
     * Display a structure definition
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    public displayStructureDef(req: Request, res: Response, next: HookableModels.ArgumentableCb): void {

        if (this.rsc.getResource(req.params.resource) === undefined) {

            let err: Schemas.OperationOutcome = {
                httpcode: 404,
                issue: {
                    code: 'processing.not-found',
                    severity: 'warning'
                }
            };

            let code: any = err.httpcode;
            res.status(code).send(err);

        } else {

            // temp ref
            let structuredef: any = this.rsc.getResource(req.params.resource);

            // set meta if needed
            if (structuredef.meta) {

                // set response headers of version
                if (structuredef.meta.versionId) {
                    res.set({
                        'ETag': 'W/"' + structuredef.meta.versionId + '"'
                    });
                }

                // set response headers of last updated
                if (structuredef.meta.lastUpdated) {
                    res.set({
                        'Last-Modified': structuredef.meta.lastUpdated
                    });
                }
            }

            // send it back
            res.send(structuredef);

            // support the run of loggers
            next();
        }
    }
    /**
     * Display value sets that are implemented
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    public displayValueset(req: Request, res: Response, next: HookableModels.ArgumentableCb): void {

        if (this.rsc.getResource(req.params.resource) === undefined) {

            let err: Schemas.OperationOutcome = {
                httpcode: 404,
                issue: {
                    code: 'processing.not-found',
                    severity: 'warning'
                }
            };

            let code: any = err.httpcode;
            res.status(code).send(err);

        } else {

            // temp ref
            let structuredef: any = this.rsc.getValueset(req.params.resource);

            // set meta if needed
            if (structuredef.meta) {

                // set response headers of version
                if (structuredef.meta.versionId) {
                    res.set({
                        'ETag': 'W/"' + structuredef.meta.versionId + '"'
                    });
                }

                // set response headers of last updated
                if (structuredef.meta.lastUpdated) {
                    res.set({
                        'Last-Modified': structuredef.meta.lastUpdated
                    });
                }
            }

            // send it back
            res.send(structuredef);

            // support the run of loggers
            next();
        }
    }
    /**
     * Display the conformance statement
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    public displayConStatement(req: Request, res: Response, next: HookableModels.ArgumentableCb): void {

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
