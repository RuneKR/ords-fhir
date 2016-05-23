import {Request, Response, Router}               from '../lib/Router';
import {DBManager}                               from '../lib/DBManager';
import {DI}                                      from '../lib/DependencyInjector';
import {Requestparser}                           from '../lib/Requestparser';
import {OperationOutcome}                        from '../models/internal/OperationOutcome';

@DI.createWith(Router, DBManager)
export class InstanceRoute {
    /**
     * Database connection
     * @type {DBManager}
     */
    private dbm: DBManager;
    /**
     * Binding the routes their function
     */
    constructor(router: Router, dbm: DBManager) {

        // bind injected values
        this.dbm = dbm;

        // bind model to router
        router.get('/:resource/:id', { parseQuery: true }, this.read.bind(this));
        router.put('/:resource/:id', { parseBody: true }, this.update.bind(this));
        router.delete('/:resource/:id', { parseQuery: true }, this.delete);
    }
    /**
     * Read a specific instance of an model
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    public read(req: Request, res: Response): void {

        // read from connection
        this.dbm.read(req.params.resource, req.query, 1).then((docs: Array<any>) => {

            // if meta data is specified then use that in return
            if (docs[0].meta) {

                // set response headers of version
                if (docs[0].meta.versionId) {
                    res.set({
                        'ETag': 'W/"' + docs[0].meta.versionId + '"'
                    });
                }

                // set response headers of last updated
                if (docs[0].meta.lastUpdated) {
                    res.set({
                        'Last-Modified': docs[0].meta.lastUpdated
                    });
                }
            }

            // send resulting doc back
            return res.send(docs[0]);

        }).catch((err: OperationOutcome) => {

            let code: any = err.httpcode;
            return res.status(code).send(err);
        });
    }
    /**
     * Update a specific instance of a resource
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    public update(req: Request, res: Response): Response {

        // check if id is set for update and do not match with params.id
        if (req.body.id !== undefined && req.params.id !== req.body.id) {

            let err: OperationOutcome = new OperationOutcome({
                httpcode: 400, issue: {
                    code: 'invalid.invariant',
                    diagnostics: 'id field cannot be changed',
                    severity: 'fatal'
                }
            });
            let code: any = err.httpcode;

            return res.status(code).send(err);
        }

        // do update
        this.dbm.update(req.params.resource, req.query, req.body).then((doc: any) => {

            // if meta data is specified then use that in return
            if (doc.meta) {

                // set response headers
                if (doc.meta.versionId) {

                    // set response headers of last updated
                    res.set({
                        'ETag': 'W/"' + doc.meta.versionId + '"'
                    });

                    // an insert has occurred report if so
                    if (doc.meta.versionId === 0) {
                        res.set({
                            'Location': '/' + req.params.resource + '/' + req.params.id
                        });
                        res.status(201);
                    }
                }

                // set header for last modified
                if (doc.meta.lastUpdated) {
                    res.set({
                        'Last-Modified': doc.meta.lastUpdated
                    });
                }
            }

            // return result to user
            return res.send(doc);

        }).catch((err: OperationOutcome) => {

            let code: any = err.httpcode;
            return res.status(code).send(err);
        });
    }
    /**
     * Delete a specific instance of an model
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    public delete(req: Request, res: Response): void {

        // do delete
        this.dbm.delete(req.params.resource, req.query).then((doc: any) => {

            return res.status(204).send({});

        }).catch((err: OperationOutcome) => {

            let code: any = err.httpcode;
            return res.status(code).send(err);
        });
    }
}
