import {RoutingComponent, RoutingModels}     from '../framework/routing';
import {ConformanceComponent}                from '../framework/conformance';
import {DependencyInjectorComponent}         from '../lib/dependency-injector';
import {Schemas}                             from '../fhir-models';


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

        // options for added routes
        let options: RoutingModels.RouteOptions = {
            isResource: false,
            protected: false
        };

        // bind to router
        this.rm.get('metadata', options, this.displayConStatement.bind(this));
        this.rm.options('', options, this.displayConStatement.bind(this));
        this.rm.post('StructureDefinition/:resource', options, this.displayStructureDef.bind(this));
        this.rm.post('ValueSet/:resource', options, this.displayValueset.bind(this));
    }
    /**
     * Display a structure definition
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    public displayStructureDef(req: RoutingModels.Request, res: RoutingModels.Response, next: RoutingModels.NextFunction): void {

        if (this.rsc.getResource(req.params.resource, true) === undefined) {
            
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
            let structuredef: any = this.rsc.getResource(req.params.resource, true);

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
    public displayValueset(req: RoutingModels.Request, res: RoutingModels.Response, next: RoutingModels.NextFunction): void {

        if (this.rsc.getResource(req.params.resource, true) === undefined) {
            
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
    public displayConStatement(req: RoutingModels.Request, res: RoutingModels.Response, next: RoutingModels.NextFunction): void {

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
