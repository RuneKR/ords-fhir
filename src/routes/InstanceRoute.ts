import {Request, Response, Router}               from '../lib/Router';
import {HookManager, Hookables}                  from '../lib/HookManager';
import {DI}                                      from '../lib/DependencyInjector';
import {OperationOutcome}                        from '../models/internal/OperationOutcome';

@DI.createWith(Router, HookManager)
export class InstanceRoute {
    /**
     * Database connection
     * @type {DBManager}
     */
    private hm: HookManager;
    /**
     * Binding the routes their function
     */
    constructor(router: Router, hm: HookManager) {

        // bind injected values
        this.hm = hm;

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

        // prepare options
        let opt: Hookables.DBManager.Read = {
            params: {
                limit: 1,
                query: req.query,
                resource: req.params.resource
            },
            result: []
        };

        // start the hook
        this.hm.doHooks<Hookables.DBManager.Read>('DBManager.Read', opt)
            .then((options: Hookables.DBManager.Read) => {

                // if meta data is specified then use that in return
                if (options.result[0].meta) {

                    // set response headers of version
                    if (options.result[0].meta.versionId) {
                        res.set({
                            'ETag': 'W/"' + options.result[0].meta.versionId + '"'
                        });
                    }

                    // set response headers of last updated
                    if (options.result[0].meta.lastUpdated) {
                        res.set({
                            'Last-Modified': options.result[0].meta.lastUpdated
                        });
                    }
                }

                // send resulting doc back
                return res.send(options.result[0]);

                // catch the operation outcome and sendt it bac
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
        // perhaps move this to somewhere else?
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

        // prepare options
        let opt: Hookables.DBManager.Update = {
            params: {
                data: req.body,
                query: req.query,
                resource: req.params.resource
            },
            result: {}
        };

        // do update
        // start the hook
        this.hm.doHooks<Hookables.DBManager.Update>('DBManager.Update', opt)
            .then((options: Hookables.DBManager.Update) => {

                // ref to updated doc
                let doc: any = options.result;

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


        // prepare options
        let opt: Hookables.DBManager.Delete = {
            params: {
                query: req.query,
                resource: req.params.resource
            },
            result: {}
        };

        // do delete
        // start the hook
        this.hm.doHooks<Hookables.DBManager.Delete>('DBManager.Delete', opt)
            .then((options: Hookables.DBManager.Delete) => {

                return res.status(204).send({});

            }).catch((err: OperationOutcome) => {

                let code: any = err.httpcode;
                return res.status(code).send(err);
            });
    }
}
