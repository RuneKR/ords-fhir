import {RoutingComponent}                               from '../../components/routing';
import {ConformanceComponent}                           from '../../components/conformance';
import {DependencyInjectorComponent}                    from '../../components/dependency-injector';
import {RouteOptions, Request, Response, NextFunction}  from '../../components/routing/routing.models';
import {OperationOutcomeComponent}                      from '../../components/operation-outcome';


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
        let options: RouteOptions = {
            isResource: false,
            middleware: {
                parsers: {
                    body: false,
                    user: false
                }
            },
            protected: false
        };

        // bind to router
        this.rm.get('metadata', options, this.displayConStatement.bind(this));
        this.rm.options('', options, this.displayConStatement.bind(this));
        this.rm.post('StructureDefinition/:resource', options, this.displayStructureDef.bind(this));
        this.rm.post('Valueset/:resource', options, this.displayValueset.bind(this));
    }
    /**
     * Display a valueset
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    public displayValueset(req: Request, res: Response, next: NextFunction): void {

        if (this.rsc.getValueset(req.params.resource) === undefined) {
            
            let err: OperationOutcomeComponent = {
                httpcode: 404, 
                issue: {
                    code: 'processing.not-found',
                    severity: 'warning'
                }
            };

            let code: any = err.httpcode;
            res.status(code).send(err);

        } else {

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
            res.result(structuredef);
            next();
        }
    }
    /**
     * Display a specific structure def
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    public displayStructureDef(req: Request, res: Response, next: NextFunction): void {

        if (this.rsc.getResource(req.params.resource, true) === undefined) {
            
            let err: OperationOutcomeComponent = {
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
            res.result(structuredef);
            next();
        }
    }
    /**
     * Display the conformance statement
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    public displayConStatement(req: Request, res: Response, next: NextFunction): void {

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

        res.result = this.rsc.conformance;

        next();
    }
}
