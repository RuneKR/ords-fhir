import {Enforce}                            from 'ts-objectschema';
import {HookManager, Hookables}             from './HookManager';
import {ResourceManager}                    from './ResourceManager';
import {Promise}                            from 'es6-promise';
import {DI}                                 from './DependencyInjector';
import {OperationOutcome}                   from '../models/internal/OperationOutcome';

/**
 * Base for the connection to any database
 */
@DI.createWith(ResourceManager, HookManager)
export class DBManager {
    /**
     * Reference to the resourcemanager
     */
    private rs: ResourceManager;
    /**
     * Reference to the hookmanager
     */
    private hm: HookManager;
    constructor(rs: ResourceManager, hm: HookManager) {

        // keep injected references
        this.rs = rs;
        this.hm = hm;
    }
    /**
     * Create a new instance of a resource with some given data and save it to a database
     * @param   {string}              model   name of the resource that is to be created a new instance of
     * @param   {Object}              query   MongoDB query that conditions if a created should be done
     * @param   {*}                   create  the data that is to be used in the creation of a resource
     * @returns {Promise}
     */
    public create(model: string, query: Object, create: any): Promise<Array<any>> {

        return new Promise((resolve: Function, reject: Function) => {

            // validate model exsists
            if (typeof this.rs.resources[model] === 'undefined') {
                return reject(new OperationOutcome({
                    httpcode: 404, issue: {
                        code: 'processing.not-supported',
                        severity: 'fatal'
                    }
                }));
            }

            let dbUpdate: any;

            // do multiple validation one to check if we are doing an update and one to check if we are doing an create
            try {
                dbUpdate = new this.rs.resources[model](create, Enforce.required);
            } catch (err) {

                return reject(new OperationOutcome({
                    httpcode: 400, issue: {
                        code: 'invalid.invariant',
                        diagnostics: err.message,
                        severity: 'fatal'
                    }
                }));
            }

            let arg: any = {
                action: {
                    data: dbUpdate,
                    query: query,
                    resource: model
                },
                result: {}
            };

            // do action
            this.hm.doHooks('DBManager.Create', arg).then((args: Hookables.DBManager.Create) => {

                // retrun result
                resolve(args.result);

                // send back operation outcome
            }).catch((err: any) => {

                reject(err);
            });
        });
    }
    /**
     * Read from a specific resource by a specific query and limit the number of rows in the output
     * @param {string}              model   name of the resource that is to be read from
     * @param {Object}              query   MongoDB query that conditions the query of the read
     * @param {number}              limit   limit the amount of data returned
     * @returns {Promise}
     */
    public read(model: string, query: Object, limit: number): Promise<Array<any>> {

        return new Promise((resolve: Function, reject: Function) => {

            // validate model exsists
            if (typeof this.rs.resources[model] === 'undefined') {
                return reject(new OperationOutcome({
                    httpcode: 404, issue: {
                        code: 'processing.not-supported',
                        severity: 'fatal'
                    }
                }));
            }

            let arg: any = {
                action: {
                    limit: limit,
                    query: query,
                    resource: model
                },
                result: []
            };

            // return action
            this.hm.doHooks('DBManager.Read', arg).then((out: Hookables.DBManager.Read) => {

                if (out.result.length === 0) {
                    reject(new OperationOutcome({
                        httpcode: 404, issue: {
                            code: 'processing.not-found',
                            severity: 'warning'
                        }
                    }));
                } else {
                    resolve(out.result);
                }
                
            // operation outcome catch
            }).catch((err: any) => {
                reject(err);
            });
        });
    }
    /**
     * Update a resource based on some data and if a query is true
     * @param   {string}              model   name of the resource that a instance is to be updated from
     * @param   {Object}              query   MongoDB query that conditions the update
     * @param   {*}                   update  the actual data to be used in the update
     * @returns {Promise}
     */
    public update(model: string, query: Object, update: any): Promise<any> {

        return new Promise((resolve: Function, reject: Function) => {

            // validate model exsists
            if (typeof this.rs.resources[model] === 'undefined') {
                return reject(new OperationOutcome({
                    httpcode: 404, issue: {
                        code: 'processing.not-supported',
                        severity: 'fatal'
                    }
                }));
            }

            let dbUpdate: any;

            try {
                // do multiple validation one to check if we are doing an update and one to check if we are doing an create
                dbUpdate = new this.rs.resources[model](update, Enforce.required);

            } catch (err) {

                return reject(new OperationOutcome({
                    httpcode: 400, issue: {
                        code: 'invalid.invariant',
                        diagnostics: err.message,
                        severity: 'fatal'
                    }
                }));
            }

            let arg: any = {
                action: {
                    data: dbUpdate,
                    query: query,
                    resource: model
                },
                result: {}
            };

            // return action
            this.hm.doHooks('DBManager.Update', arg).then((out: Hookables.DBManager.Update) => {
    
               resolve(out.result);
                
            // operation outcome catch
            }).catch((err: any) => {
                reject(err);
            });
        });
    }
    /**
     * Delete some resource given som conditions
     * @param {string}              model   name of the resource that something should be deleted from
     * @param {Object}              query   the conditions for the removal of an item
     * @returns {Promise}
     */
    public delete(model: string, query: Object): Promise<any> {

        return new Promise((resolve: Function, reject: Function) => {

            // validate model exsists
            if (typeof this.rs.resources[model] === 'undefined') {
                return reject(new OperationOutcome({
                    httpcode: 404, issue: {
                        code: 'processing.not-supported',
                        severity: 'fatal'
                    }
                }));
            }

            let arg: any = {
                action: {
                    query: query,
                    resource: model
                },
                result: {}
            };

            // return action
            this.hm.doHooks('DBManager.Delete', arg).then((out: Hookables.DBManager.Delete) => {
    
               resolve(out.result);
                
            // operation outcome catch
            }).catch((err: any) => {
                reject(err);
            });
        });
    }
}
