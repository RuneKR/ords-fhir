import {Enforce}                         from 'ts-objectschema';
import {Request, Response, NextFunction} from 'express';
import * as parser                       from 'body-parser';
import {ResourceManager}                 from '../lib/ResourceManager';
import {HookManager}                     from '../lib/HookManager';
import {DI}                              from '../lib/DependencyInjector';
import {OperationOutcome}                from '../resources/internal/OperationOutcome';

/**
 * Toolbox for handling incomming requests
 * @class Requestparser
 */
@DI.inject(ResourceManager, HookManager)
export class Requestparser {
    /**
     * reference to database
     */
    private resourceManager: ResourceManager;
    /**
     * reference to hooks
     */
    private hookManager: HookManager;
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
     * @param   {Request}   req    the express request
     * @param   {Response}  res    the express response object
     * @param   {Function}  next   next function to be run during the request
     * @returns {void}      no feedback is provided back req.query is updated
     */
    public parseQuery(req: Request, res: Response, next: NextFunction): Response {

        // validate that the model do exsist
        if (this.resourceManager.rest[req.params.model] === undefined) {

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

        // container for new query
        let newQuery: any = {};

        this.hookManager.doHooks('routes.parsequery', newQuery, req.query).then((newQuery: any) => {

            // parameters for all resources
            try {
                this.parseFhirGenParameters(newQuery, req.query);
            } catch (err) {

                let code: any = err.httpcode;
                return res.status(code).send(err);
            }

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
                req.query = new this.resourceManager.rest[req.params.model](newQuery, Enforce.exists);
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
    /**
     * Parse some general FHIR paramenters as specificed in https://www.hl7.org/fhir/search.html
     * @param   {Object}    newQuery    the new query to be passed to
     * @param   {Object}    query       old query that should be used to pass
     * @returns {void}      no feedback is provided back req.query is updated
     */
    private parseFhirGenParameters(newQuery: any, query: any): void {

        // parameters for all resources
        if (query._id) {
            newQuery.id = query._id;
            delete query._id;
        }

        // make sure not to override meta if it is actually provided
        if (
            newQuery.meta === undefined &&
            (
                query._tag !== undefined ||
                query._lastUpdated !== undefined ||
                query._profile !== undefined
            )
        ) {
            newQuery.meta = {};
        }

        if (query._tag) {
            let tmpTag: Array<string> = query._tag.split('|');
            if (tmpTag.length === 1) {
                newQuery.meta.tag = {
                    code: tmpTag[0]
                };
            } else {
                newQuery.meta.tag = {
                    code: tmpTag[0],
                    system: tmpTag[1]
                };
            }
            delete query._tag;
        }

        if (query._lastUpdated) {
            // last updated is allways greater than equal
            newQuery.meta.lastUpdated = { $gte: query._lastUpdated };
            delete query._lastUpdated;
        }

        if (query._profile) {
            newQuery.meta.profile = query._profile;
            delete query._profile;
        }

        if (query._security) {
            let tmpTag: Array<string> = query._security.split('|');
            if (tmpTag.length === 1) {
                newQuery.meta.security = {
                    code: tmpTag[0]
                };
            } else {
                newQuery.meta.security = {
                    code: tmpTag[0],
                    system: tmpTag[1]
                };
            }
            delete query._security;
        }
    }
}
