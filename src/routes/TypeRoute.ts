import {Router, Request, Response}               from '../lib/Router';
import {HookManager, Hookables}                  from '../lib/HookManager';
import {DI}                                      from '../lib/DependencyInjector';
import {OperationOutcome}                        from '../models/internal/OperationOutcome';

@DI.createWith(Router, HookManager)
export class TypeRoute {
    /**
     * Database connection management singleton
     */
    private hm: HookManager;
    /**
     * Binding the routes their function
     */
    constructor(route: Router, hm: HookManager) {

        // bind reference
        this.hm = hm;

        // bind model to router
        route.get(
            '/:resource/',
            { merge: true, parseBody: true, parseQuery: true },
            this.search.bind(this)
        );
        route.post(
            '/:resource/_search',
            { merge: true, parseBody: true, parseQuery: true },
            this.search.bind(this)
        );
        route.post(
            '/:resource/',
            { parseBody: true },
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

        // prepare options
        let opt: Hookables.DBManager.Read = {
            params: {
                limit: 1,
                query: req.query,
                resource: req.params.resource
            },
            result: []
        };

        // do update
        // start the hook
        this.hm.doHooks<Hookables.DBManager.Read>('DBManager.Read', opt)
            .then((options: Hookables.DBManager.Read) => {

                // if meta data is specified then use that in return
                if (options.result[0].meta) {

                    // set response headers
                    if (options.result[0].meta.versionId) {
                        res.set({
                            'ETag': 'W/"' + options.result[0].meta.versionId + '"'
                        });
                    }

                    if (options.result[0].meta.lastUpdated) {
                        res.set({
                            'Last-Modified': options.result[0].meta.lastUpdated
                        });
                    }
                }

                res.send(options.result[0]);

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

        // prepare options
        let opt: Hookables.DBManager.Create = {
            params: {
                data: req.body,
                query: {},
                resource: req.params.resource
            },
            result: []
        };

        // do update
        // start the hook
        this.hm.doHooks<Hookables.DBManager.Create>('DBManager.Create', opt)
            .then((options: Hookables.DBManager.Create) => {

                // ref to updated doc
                let doc: any = options.result;

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
