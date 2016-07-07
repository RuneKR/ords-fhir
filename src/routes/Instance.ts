import {RoutingComponent}                  from '../components/routing';
import {DatabaseComponent}                 from '../components/database';
import {DependencyInjectorComponent}       from '../components/dependency-injector';
import {RouteOptions, Request, Response, NextFunction}  from '../components/routing/routing.models';
import {OperationOutcomeComponent}         from '../components/operation-outcome';

/**
 * HL7 FHIR instance interactions
 */
export class Instance {
    /**
     * Reference to database component
     */
    @DependencyInjectorComponent.inject(DatabaseComponent)
    private dc: DatabaseComponent;
    /**
     * Reference to route component
     */
    @DependencyInjectorComponent.inject(RoutingComponent)
    private rc: RoutingComponent;
    /**
     * Binding the routes their function
     */
    constructor() {

        // options for added routes
        let options: RouteOptions = {
            isResource: true,
            protected: true
        };

        // bind model to router
        this.rc.get(':id', options, this.read.bind(this));
        this.rc.delete(':id', options, this.delete.bind(this));
        this.rc.put(':id', options, this.update.bind(this));

    }
    /**
     * Read a specific instance of an resource
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    public read(req: Request, res: Response, next: NextFunction): void {

        // prepare options for the db action
        req.query._count = 1;

        // do database stuff
        this.dc.read(req).then((result: Array<any>) => {

            // bind found result to res object
            res.result = result;

            // if meta data is specified then use that in return
            if (res.result[0].meta) {

                // set response headers of version
                if (res.result[0].meta.versionId) {
                    res.set({
                        'ETag': 'W/"' + res.result[0].meta.versionId + '"'
                    });
                }

                // set response headers of last updated
                if (res.result[0].meta.lastUpdated) {
                    res.set({
                        'Last-Modified': res.result[0].meta.lastUpdated
                    });
                }
            }

            // send resulting doc back
            next();

            // error has allready been populated res object so just go next
        }).catch(() => {

            next();
        });
    }
    /**
     * Update a specific instance of an resource
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    public update(req: Request, res: Response, next: NextFunction): void {

        // check if id is set for update and do not match with params.id 
        if (req.body.id !== undefined && req.params.id !== req.body.id) {

            let err: OperationOutcomeComponent = {
                httpcode: 400, issue: {
                    code: 'invalid.invariant',
                    diagnostics: 'id field cannot be changed',
                    severity: 'fatal'
                }
            };

            let code: any = err.httpcode;
            res.status(code);
            res.result = err;

            return next();
        }

        // do update
        this.dc.update(req).then((result: any) => {

            // bind found result to res object
            res.result = result;

            // if meta data is specified then use that in return
            if (res.result.meta) {

                // set response headers
                if (res.result.meta.versionId) {

                    // set response headers of last updated
                    res.set({
                        'ETag': 'W/"' + res.result.meta.versionId + '"'
                    });

                    // an insert has occurred report if so
                    if (res.result.meta.versionId === 0) {
                        res.set({
                            'Location': '/' + req.params.resource + '/' + req.params.id
                        });
                        res.status(201);
                    }
                }

                // set header for last modified
                if (res.result.meta.lastUpdated) {
                    res.set({
                        'Last-Modified': res.result.meta.lastUpdated
                    });
                }
            }

            // go next
            next();

            // error has allready been populated res object so just go next
        }).catch(() => {

            next();
        });
    }
    /**
     * Delete a specific instance of an resource
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    public delete(req: Request, res: Response, next: NextFunction): void {

        // do delete and then go next
        this.dc.delete(req).then(() => {

            next();

            // error has allready been populated res object so just go next
        }).catch(() => {

            next();
        });
    }
}
