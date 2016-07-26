import {RoutingComponent}                  from '../framework/routing';
import {DatabaseComponent}                 from '../framework/database';
import {DependencyInjectorComponent}       from '../lib/dependency-injector';
import {RouteOptions, Request, Response, NextFunction}  from '../framework/routing/routing.models';
import {Schemas}                           from '../fhir-models';

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
        req.query['_count'] = 1;

        // do database stuff
        this.dc.read(req).then((result: Array<any>) => {

            // if meta data is specified then use that in return
            if (result[0].meta) {

                // set response headers of version
                if (result[0].meta.versionId) {
                    res.set({
                        'ETag': 'W/"' + result[0].meta.versionId + '"'
                    });
                }

                // set response headers of last updated
                if (result[0].meta.lastUpdated) {
                    res.set({
                        'Last-Modified': result[0].meta.lastUpdated
                    });
                }
            }

            res.send(result);

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

            let err: Schemas.OperationOutcome = {
                httpcode: 400, issue: {
                    code: 'invalid.invariant',
                    diagnostics: 'id field cannot be changed',
                    severity: 'fatal'
                }
            };

            let code: any = err.httpcode;
            res.status(code);
            res.send(err);

            return next();
        }

        // do update
        this.dc.update(req).then((result: any) => {

            // bind found result to res object
            result = result;

            // if meta data is specified then use that in return
            if (result.meta) {

                // set response headers
                if (result.meta.versionId) {

                    // set response headers of last updated
                    res.set({
                        'ETag': 'W/"' + result.meta.versionId + '"'
                    });

                    // an insert has occurred report if so
                    if (result.meta.versionId === 0) {
                        res.set({
                            'Location': '/' + req.params.resource + '/' + req.params.id
                        });
                        res.status(201);
                    }
                }

                // set header for last modified
                if (result.meta.lastUpdated) {
                    res.set({
                        'Last-Modified': result.meta.lastUpdated
                    });
                }
            }

            res.send(result);

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
