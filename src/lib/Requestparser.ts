import {Enforce}                         from 'ts-objectschema';
import {Request, Response, NextFunction} from '../lib/Router';
import * as parser                       from 'body-parser';
import {ResourceManager}                 from '../lib/ResourceManager';
import {HookManager}                     from '../lib/HookManager';
import {DI}                              from '../lib/DependencyInjector';
import {OperationOutcome}                from '../models/internal/OperationOutcome';
import {Promise}                         from 'es6-promise';


interface IFormatter {
    (data: any, toUpper: any, toUppero: any): string;
};

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
     * Generate MongoDB query based on a FHIR query
     * @param   {string}    resource   name of the resource 
     * @param   {object}    query      query to be validated
     * @returns {Promise}   
     */
    public parseQuery(resource: string, query: Object): Promise<Object> {

        return new Promise((resolve: Function, reject: Function) => {

            // validate that the resource do exsist
            if (this.rm.resources[resource] === undefined) {

                reject(new OperationOutcome({
                    httpcode: 400, issue: {
                        code: 'invalid.invariant',
                        diagnostics: 'Resource do not exist',
                        severity: 'fatal'
                    }
                }));
            }

            // set arguments for hooks
            let args: any = {
                parsed: {},
                query: query,
                resource: resource,
            };

            // do the hooking
            this.hm.doHooks('Requestparser.parseQuery', args).then((params: Array<any>) => {

                // look at the rest of keys in query
                let keys: Array<string> = Object.keys(query);

                // if more key are left then something is wrong
                if (keys.length !== 0) {

                    return reject(new OperationOutcome({
                        httpcode: 400, issue: {
                            code: 'invalid.invariant',
                            diagnostics: 'These parameters are not supported in search: ' + keys.join(','),
                            severity: 'fatal'
                        }
                    }));
                }
                
                // resolve with the query
                resolve(args.parsed);
            });
        });
    }
}
