import {Router, Request, Response}               from '../lib/Router';
import {DBManager}                               from '../lib/DBManager';
import {DI}                                      from '../lib/DependencyInjector';
import {OperationOutcome}                        from '../models/internal/OperationOutcome';

@DI.createWith(Router, DBManager)
export class TypeRoute {
    /**
     * Database connection management singleton
     */
    private dbm: DBManager;
    /**
     * Binding the routes their function
     */
    constructor(route: Router, dbm: DBManager) {
        
        // bind reference
        this.dbm = dbm;

        // bind model to router
        route.get(
            '/:resource/',
            { merge: true, parseBody: true, parseQuery: true },
            this.search.bind(this)
        );
        route.post(
            '/:resource/_search',
            { merge: true, parseBody: true, parseQuery: true },
            this.search_body.bind(this)
        );
        route.post(
            '/:resource/',
            { parseBody: true},
            this.create.bind(this)
        );
    }

    /**
     * Search a given model
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    public search(req: Request, res: Response): void {

        // read from connection
        this.dbm.read(req.params.model, req.query, 1).then((docs: any) => {

            // if meta data is specified then use that in return
            if (docs[0].meta) {

                // set response headers
                if (docs[0].meta.versionId) {
                    res.set({
                        'ETag': 'W/"' + docs[0].meta.versionId + '"'
                    });
                }

                if (docs[0].meta.lastUpdated) {
                    res.set({
                        'Last-Modified': docs[0].meta.lastUpdated
                    });
                }
            }

            res.send(docs[0]);

        }).catch((err: OperationOutcome) => {

            let code: any = err.httpcode;
            return res.status(code).send(err);
        });
    }
    /**
     * Search a given model by body of the request
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    public search_body(req: Request, res: Response): void {

        // read from connection
        this.dbm.read(req.params.model, req.body, 1).then((docs: any) => {

            // if meta data is specified then use that in return
            if (docs[0].meta) {

                // set response headers
                if (docs[0].meta.versionId) {
                    res.set({
                        'ETag': 'W/"' + docs[0].meta.versionId + '"'
                    });
                }

                if (docs[0].meta.lastUpdated) {
                    res.set({
                        'Last-Modified': docs[0].meta.lastUpdated
                    });
                }
            }

            res.send(docs[0]);

        }).catch((err: OperationOutcome) => {

            let code: any = err.httpcode;
            return res.status(code).send(err);
        });
    }
    /**
     * Create an instance of an model
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    public create(req: Request, res: Response): void {

        // do update
        this.dbm.create(req.params.model, {}, req.body).then((doc: any) => {

            // if meta data is specified then use that in return
            if (doc.meta) {

                // set response headers
                if (doc.meta.versionId) {
                    res.set({
                        'ETag': 'W/"' + doc.meta.versionId + '"'
                    });

                    // an insert has occured
                    if (doc.meta.versionId === 0) {
                        res.set({
                            'Location': '/' + req.params.model + '/' + req.params.id
                        });
                        res.status(201);
                    }
                }

                if (doc.meta.lastUpdated) {
                    res.set({
                        'Last-Modified': doc.meta.lastUpdated
                    });
                }
            }

            return res.send(doc);

        }).catch((err: OperationOutcome) => {

            let code: any = err.httpcode;
            return res.status(code).send(err);
        });
    }
}
