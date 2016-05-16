import {Enforce}            from 'ts-objectschema';
import {HookManager}        from './HookManager';
import {ResourceManager}    from './ResourceManager';
import {Promise}            from 'es6-promise';
import {DI}                 from './DependencyInjector';
import {OperationOutcome}   from '../resources/models/OperationOutcome';

/**
 * Base for the connection to any database
 */
export class DBManager {
    /**
     * Reference to the resourcemanager
     */
    @DI.injectProperty(ResourceManager)
    private rs: ResourceManager;
    /**
     * Reference to the hookmanager
     */
    @DI.injectProperty(HookManager)
    private hm: HookManager;
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
            if (typeof this.rs.models[model] === 'undefined') {
                return reject(new OperationOutcome({
                    httpcode: 404, issue: {
                        code: 'processing.not-supported',
                        severity: 'fatal'
                    }
                }));
            }

            // do multiple validation one to check if we are doing an update and one to check if we are doing an create
            let dbUpdate: any = new this.rs.models[model](create, Enforce.required);

            // do action
            this.hm.doHooks('dbm.create', model, query, dbUpdate, function (err: OperationOutcome, doc: any): void {

                if (err) {
                    reject(OperationOutcome);
                } else {
                    resolve(doc);
                }
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
            if (typeof this.rs.models[model] === 'undefined') {
                return reject(new OperationOutcome({
                    httpcode: 404, issue: {
                        code: 'processing.not-supported',
                        severity: 'fatal'
                    }
                }));
            }

            // return action
            this.hm.doHooks('dbm.read', model, query, limit, function (err: OperationOutcome, docs: Array<any>): void {

                if (err) {
                    reject(OperationOutcome);
                } else if (docs.length === 0) {
                    reject(new OperationOutcome({
                        httpcode: 404, issue: {
                            code: 'processing.not-found',
                            severity: 'warning'
                        }
                    }));
                } else {
                    resolve(docs);
                }
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
            if (typeof this.rs.models[model] === 'undefined') {
                return reject(new OperationOutcome({
                    httpcode: 404, issue: {
                        code: 'processing.not-supported',
                        severity: 'fatal'
                    }
                }));
            }

            // do multiple validation one to check if we are doing an update and one to check if we are doing an create
            let dbUpdate: any = new this.rs.models[model](update, Enforce.exists);
            let dbCreate: Object;

            // try to see if required could be done
            try {
                dbCreate = new this.rs.models[model](update, Enforce.required);
            } catch (e) {
                dbCreate = undefined;
            }

            // do action
            this.hm.doHooks('dbm.update', model, query, dbUpdate, dbCreate, function (err: OperationOutcome, doc: any): void {

                if (err) {
                    reject(OperationOutcome);
                } else if (doc === undefined) {
                    reject(new OperationOutcome({
                        httpcode: 404, issue: {
                            code: 'processing.not-found',
                            severity: 'warning'
                        }
                    }));
                } else {
                    resolve(doc);
                }
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
            if (typeof this.rs.models[model] === 'undefined') {
                return reject(new OperationOutcome({
                    httpcode: 404, issue: {
                        code: 'processing.not-supported',
                        severity: 'fatal'
                    }
                }));
            }

            // return action
            this.hm.doHooks('dbm.delete', model, query, function (err: OperationOutcome, doc: any): void {

                if (err) {
                    reject(OperationOutcome);
                } else if (doc === undefined) {
                    reject(new OperationOutcome({
                        httpcode: 404, issue: {
                            code: 'processing.not-found',
                            severity: 'warning'
                        }
                    }));
                } else {
                    resolve(doc);
                }
            });
        });
    }
}
