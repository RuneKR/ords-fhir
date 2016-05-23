import {Enforce}                         from 'ts-objectschema';
import {Request, Response, NextFunction} from '../lib/Router';
import * as parser                       from 'body-parser';
import {ResourceManager}                 from '../lib/ResourceManager';
import {HookManager}                     from '../lib/HookManager';
import {DI}                              from '../lib/DependencyInjector';
import {OperationOutcome}                from '../models/internal/OperationOutcome';

/**
 * Toolbox for handling incomming requests
 * @class Requestparser
 */
@DI.createWith(ResourceManager, HookManager)
export class Requestparser {
    /**
     * Reference to the resources
     */
    private rm: ResourceManager;
    /**
     * Reference to hooks
     */
    private hm: HookManager;
    /**
     * Create new instance of Requestparser
     */
    constructor(rm: ResourceManager, hm: HookManager) {

        // binds references to class instance
        this.rm = rm;
        this.hm = hm;
    }
    /**
     * Parse the body of an request into the req.body
     * @param   {Request}   req    the express request
     * @param   {Response}  res    the express response object
     * @param   {Function}  next   next function to be run during the request
     * @returns {void}      no feedback is provided back req.body is updated
     */
    public parseBody(req: Request, res: Response, next: NextFunction): void {

        // parse application/x-www-form-urlencoded
        parser.urlencoded({
            extended: false,
            limit: process.env.LIMIT_UPLOAD_MB + 'mb'
        })(req, res, function (): void {

            // parse application/json
            parser.json({
                limit: process.env.LIMIT_UPLOAD_MB + 'mb'
            })(req, res, next);
        });
    }
    /**
     * Adds the body to the query params and generate
     * @param   {Request}   req    the express request
     * @param   {Response}  res    the express response object
     * @param   {Function}  next   next function to be run during the request
     * @returns {void}      no feedback is provided back req.query is updated
     */
    public parseQueryFromBody(req: Request, res: Response, next: NextFunction): void {

        // adds body to req
        req.query = req.body;

        next();
    }
    /**
     * Generate MongoDB query based on a FHIR query
     * @param   {Request}   req    the express request needs params.model and query contained
     * @param   {Response}  res    the express response object
     * @param   {Function}  next   next function to be run during the request
     * @returns {void}      no feedback is provided back req.query is updated
     */
    public parseQuery(req: Request, res: Response, next: NextFunction): Response {

        // validate that the model do exsist
        if (this.rm.rest[req.params.model] === undefined) {

            // OperationOutcome NEEEDS TO BE BUNDLED!
            let err: OperationOutcome = new OperationOutcome({
                httpcode: 400, issue: {
                    code: 'invalid.invariant',
                    diagnostics: 'rest model do not exsists',
                    severity: 'fatal'
                }
            });

            let code: any = err.httpcode;
            return res.status(code).send(err);
        }

        // parse a container containing the new query and the old query
        this.hm.doHooks('routes.parsequery', {}, req.query).then((newQuery: any) => {

            // look at the rest of keys in query
            let keys: Array<string> = Object.keys(req.query);

            // if more key are left then something is wrong
            if (keys.length !== 0) {

                // OperationOutcome NEEEDS TO BE BUNDLED!
                let err: OperationOutcome = new OperationOutcome({
                    httpcode: 400, issue: {
                        code: 'invalid.invariant',
                        diagnostics: 'These parameters are not supported in search: ' + keys.join(','),
                        severity: 'fatal'
                    }
                });
                let code: any = err.httpcode;
                return res.status(code).send(err);

            }

            // to to set a new query format
            try {
                req.query = new this.rm.rest[req.params.model](newQuery, Enforce.exists);
            } catch (context) {

                // OperationOutcome NEEEDS TO BE BUNDLED!
                let err: OperationOutcome = new OperationOutcome({
                    httpcode: 400, issue: {
                        code: 'invalid.invariant',
                        diagnostics: context.message,
                        severity: 'fatal'
                    }
                });
                let code: any = err.httpcode;
                return res.status(code).send(err);
            }
            next();
        });
    }
}
