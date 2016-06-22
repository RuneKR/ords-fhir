import {RoutingComponent}                               from '../../components/routing';
import {DatabaseComponent}                              from '../../components/database';
import {DependencyInjectorComponent}                    from '../../components/dependency-injector';
import {RouteOptions, Request, Response, NextFunction}  from '../../components/routing/routing.models';

/**
 * HL7 FHIR instance interactions
 */
export class Type {
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
            middleware: {
                parsers: {
                    user: true
                }
            },
            protected: true
        };

        // bind model to router
        this.rc.get('', options, this.search.bind(this));

        // do body parsing here
        options.middleware.parsers.body = true;
        this.rc.post('_search', options, this.search_body.bind(this));
        this.rc.post('', options, this.create.bind(this));
    }
    /**
     * Search a resource
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    public search(req: Request, res: Response, next: NextFunction): void {

        // prepare options for the db action
        if (req.query._count === undefined) {
            req.query._count = 30;
        }

        // do database stuff
        this.dc.read(req, res).then(() => {

            // send resulting doc back
            next();

            // error has allready been populated res object so just go next
        }).catch(() => {

            next();
        });
    }
    /**
     * Search a resource when query is in body
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    public search_body(req: Request, res: Response, next: NextFunction): void {

        // prepare options for the db action
        if (req.query._count === undefined) {
            req.query._count = 30;
        }

        // move all from body to query in req object
        let keys: Array<string> = Object.keys(req.body);

        for (let key of keys) {
            req.query[key] = req.body[key];
            delete req.body[key];
        }

        // do database stuff
        this.dc.read(req, res).then(() => {

            // send resulting doc back
            next();

            // error has allready been populated res object so just go next
        }).catch(() => {

            next();
        });
    }
    /**
     * Create a new resource
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    public create(req: Request, res: Response, next: NextFunction): void {

        // do database stuff
        this.dc.create(req, res).then(() => {

            // if meta data is specified then use that in return
            if (res.result.meta) {

                // set response headers
                if (res.result.meta.versionId) {
                    res.set({
                        'ETag': 'W/"' + res.result.meta.versionId + '"'
                    });

                    // an insert has occured
                    if (res.result.meta.versionId === 0) {
                        res.set({
                            'Location': '/' + req.resource.name + '/' + req.params.id
                        });
                        res.status(201);
                    }
                }

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
}
