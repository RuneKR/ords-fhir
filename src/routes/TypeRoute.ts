import {ObjectID}                  from 'mongodb';
import {Router, Request, Response} from 'express';
import {DBManager}                 from '../lib/DBManager';
import {DI}                        from '../lib/DependencyInjector';
import {requestparser}             from '../lib/Requestparser';

export class TypeRoute {
    /**
     * Express routing elemeent
     * @type {Router}
     */
    public route: Router;
    /**
     * Database connection management singleton
     */
    @DI.injectProperty(DBManager)
    private dbm: DBManager;
    /**
     * Binding the routes their function
     */
    constructor() {

        // setup router
        this.route = Router();

        // bind model to router
        this.route.get('/:model/', this.search);
        this.route.post('/:model/_search', requestparser.parseBody, this.search_body);
        this.route.post('/:model/', requestparser.parseBody, this.create);

    }
    public search(req: Request, res: Response): Response {

        // read query or return error
        try {
            req.query = requestparser.parseQuery(req.params.model, req.query);
        } catch (e) {
            return res.status(500).send(e.toString());
        }

        // read from connection
        this.dbm.read(req.params.model, req.query, 1, (err: Error, docs: any) => {

            // report error
            if (err) {
                return res.status(docs).send(err.toString());
            }

            // not found any document
            if (docs.length === 0) {
                return res.status(404).send('No document found');
            }

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
        });
    }
    public search_body(req: Request, res: Response): void {

        // read from connection
        this.dbm.read(req.params.model, { id: { $eq: new ObjectID(req.params.id) } }, 1, (err: Error, docs: any) => {

            // report error
            if (err) {
                return res.status(docs).send(err.toString());
            }

            // not found any document
            if (docs.length === 0) {
                return res.status(404).send('No document found');
            }

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

        });
    }
    public create(req: Request, res: Response): void {

        // do update
        this.dbm.update(
            req.params.model,
            { id: { $eq: new ObjectID(req.params.id) } },
            req.body,
            (err: Error, doc: any) => {

                // report err
                if (err) {
                    return res.status(doc).send(err.toString());
                }

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
            });
    }
}
