import {Router, Request, Response} from 'express';
import {DI}                        from '../lib/DependencyInjector';
import {ResourceManager}           from '../lib/ResourceManager';
import {OperationOutcome}          from '../resources/internal/OperationOutcome';
import {ConformanceManager}        from '../lib/ConformanceManager';
import {StructureDefinition}       from '../resources/internal/StructureDefinition';
import {Enforce}                   from 'ts-objectschema';

@DI.inject(ResourceManager, ConformanceManager)
export class SystemRoute {
    /**
     * Express routing elemeent
     * @type {Router}
     */
    public route: Router = Router();
    /**
     * Reference to database manager
     */
    private resourceManager: ResourceManager;
    /**
     * Reference to Conformance manager
     */
    private conformanceManager: ConformanceManager;
    /**
     * Binding the routes their function
     */
    constructor() {

        // bind functions to router
        this.route.get('/ValueSet/:model', this.displayValueSet.bind(this));
        this.route.get('/StructureDefinition/:model', this.displayStructureDef.bind(this));
        this.route.get('/metadata', this.displayConStatement.bind(this));

    }
    /**
     * Display a specific valueset
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    public displayValueSet(req: Request, res: Response): Response {

        // not found any document
        if (this.resourceManager.valueSets[req.params.model] === 'undefined') {
            let err: OperationOutcome = new OperationOutcome({
                httpcode: 404, issue: {
                    code: 'processing.not-found',
                    severity: 'warning'
                }
            });

            let code: any = err.httpcode;
            res.status(code).send(err);

        } else {

            // create a new valueset that can be anything
            let valueset: any = new this.resourceManager.valueSets[req.params.model]();

            // set meta if needed
            if (valueset.meta) {

                // set response headers of version
                if (valueset.meta.versionId) {
                    res.set({
                        'ETag': 'W/"' + valueset.meta.versionId + '"'
                    });
                }

                // set response headers of last updated
                if (valueset.meta.lastUpdated) {
                    res.set({
                        'Last-Modified': valueset.meta.lastUpdated
                    });
                }
            }

            return res.send(valueset);
        }
    }
    /**
     * Display a specific structure def
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    public displayStructureDef(req: Request, res: Response): Response {

        if (this.resourceManager.rest[req.params.model] === 'undefined') {
            let err: OperationOutcome = new OperationOutcome({
                httpcode: 404, issue: {
                    code: 'processing.not-found',
                    severity: 'warning'
                }
            });

            let code: any = err.httpcode;
            res.status(code).send(err);

        } else {

            let structuredef: any;

            // calculate new structre here and anything ETAG osv.
            try {
                structuredef = new StructureDefinition(this.resourceManager.rest[req.params.model], Enforce.exists);

            } catch (err) {
                
                let oc: OperationOutcome = new OperationOutcome({
                    httpcode: 500, issue: {
                        code: 'transient.exception',
                        diagnostics: err.message,
                        severity: 'fatal'
                    }
                });

                let code: any = oc.httpcode;
                res.status(code).send(oc);
            }
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
            return res.send(structuredef);

        }

    }
    /**
     * Display the conformance statement
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    public displayConStatement(req: Request, res: Response): Response {

        let conformance: any = this.conformanceManager.conformance;

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

        return res.send(conformance);
    }
}
