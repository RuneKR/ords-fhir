import {Request, Response, NextFunction} from '../lib/Router';
import {ResourceManager}                 from '../lib/ResourceManager';
import {HookManager}                     from '../lib/HookManager';
import {DI}                              from '../lib/DependencyInjector';
import {OperationOutcome}                from '../models/internal/OperationOutcome';

import * as parser                       from 'body-parser';

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
     * Create new instance of Requestparser and save injected references
     */
    constructor(rm: ResourceManager, hm: HookManager) {

        // binds references to class instance
        this.rm = rm;
        this.hm = hm;

    }
    /**
     * Validate that requestet resource is actually a resource
     * @param   {Request}   req    the express request
     * @param   {Response}  res    the express response object
     * @param   {Function}  next   next function to be run during the request
     * @returns {void}      no feedback is provided back req.body is updated
     */
    public checkIsResource(req: Request, res: Response, next: NextFunction): void {

        // if resource param not defined then just skip
        if (req.params.resource === undefined) {
            next();
        }

        // validate that the resource do exsist
        if (this.rm.resources[req.params.resource] === undefined) {

            // OBS SEND BOUND ETC
            if (req.params.boundle) {
                res.status(404).send(new OperationOutcome({
                    httpcode: 404, issue: {
                        code: 'invalid.invariant',
                        diagnostics: 'Resource do not exist',
                        severity: 'fatal'
                    }
                }));

                // just send a normal operation outcome back   
            } else {
                res.status(404).send(new OperationOutcome({
                    httpcode: 404, issue: {
                        code: 'invalid.invariant',
                        diagnostics: 'Resource do not exist',
                        severity: 'fatal'
                    }
                }));
            }
        }
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
     * Merge body and query into query
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    public merge(req: Request, res: Response, next: NextFunction): void {

        // copy everything from body to query
        Object.keys(req.body).forEach(function (value: string): void {

            req.query[value] = req.body[value];
        });
    }
    /**
     * Generate MongoDB query based on a FHIR query from req.query and req.params
     * Skips params that follow _param syntax
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Promise}   
     */
    public parseQuery(req: Request, res: Response, next: NextFunction): void {

        // DO SOMETHING WITH BOUNDLE FLAG

        // look through all the keys and add the params key to query object
        Object.keys(req.params).forEach(function (key: string): void {

            // validate that key is to be set in query
            if (key !== 'resource' || key[0] !== '_') {

                // parse value from params to query
                req.query[key] = req.params[key];
            }
        });

        // set arguments for hooks
        let args: any = {
            action: {
                query: req.query,
                resource: req.params.resource
            },
            result: {}
        };

        // do the hooking
        this.hm.doHooks('Requestparser.ParseQuery', args).then((params: any) => {

            // look at the rest of keys in query
            let keys: Array<string> = Object.keys(params.query);

            // if more key are left then something is wrong
            if (keys.length !== 0) {

                return res.status(400).send(new OperationOutcome({
                    httpcode: 400, issue: {
                        code: 'invalid.invariant',
                        diagnostics: 'These parameters are not supported in search: ' + keys.join(','),
                        severity: 'fatal'
                    }
                }));
            }

            req.query = params.result;

            // go next in line
            next();

            // catch OperationOutcome
        }).catch((err: any) => {

            // send back result mabye boundle
            res.status(err.httpcode).send(err);
        });
    }
}
