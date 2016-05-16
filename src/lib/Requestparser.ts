import {Enforce}                         from 'ts-objectschema';
import {Request, Response, NextFunction} from 'express';
import * as parser                       from 'body-parser';
import {OperationOutcome}                from '../resources/models/OperationOutcome';
import {ResourceManager}                 from '../lib/ResourceManager';
import {HookManager}                     from '../lib/HookManager';
import {DI}                              from '../lib/DependencyInjector';

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
    public parseQuery(req: Request, res: Response, next: NextFunction): void {

        this.hookManager.doHooks('routes.parsequery', req.query).then((oldQuery: any) => {

            let newQuery: any = {};

            // parameters for all resources
            try {
                this.parseFhirGenParameters(newQuery, oldQuery);
            } catch (err) {

                let code: any = err.httpcode;
                return res.status(code).send(err);
            }

            // loop all keys
            Object.keys(oldQuery).forEach(() => {
                    parseFhirPrefixes
            });

            // to to set a new query format
            try {
                req.query = new this.resourceManager.models[req.params.model](newQuery, Enforce.exists);
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
     * Read all search types that can have prefix values
     * @param   {String}    value    the value to be passed
     * @returns {void}      no feedback is provided back req.query is updated
     */
    private parseFhirPrefixes(value: any): Object {

        if (isNaN(value.charAt(2))) {
            return { $eq: value };
        }

        let prefix = value.substr(0, 2);

        switch (prefix) {
            case 'eq':
                break;
            case 'ne':
                break;
            case 'gt':
                break;
            case 'lt':
                break;
            case 'ge':
                break;
            case 'le':
                break;
            case 'sa':
                break;
            case 'eb':
                break;
            case 'ap':
                break;
            default:
                // new error
        }
        return {


        };
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
