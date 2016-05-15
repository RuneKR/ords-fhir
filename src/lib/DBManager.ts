import {MongoCallback}      from 'mongodb';
import {Enforce}            from 'ts-objectschema';
import {HookManager}        from './HookManager';
import {ResourceManager}    from './ResourceManager';
import {DI}                 from './DependencyInjector';

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
     * @param {string}              model   name of the resource that is to be created a new instance of
     * @param {Object}              query   MongoDB query that conditions if a created should be done
     * @param {*}                   create  the data that is to be used in the creation of a resource
     * @param {MongoCallback<any>}  cb      callback that will handle output of the async database call
     * @returns {void}
     */
    public create(model: string, query: Object, create: any, cb: MongoCallback<any>): void {

        // validate model exsists
        if (typeof this.rs.models[model] === 'undefined') {
            return cb(new Error('Model do not exsists'), 404);
        }

        // do multiple validation one to check if we are doing an update and one to check if we are doing an create
        let dbUpdate: any = new this.rs.models[model](create, Enforce.required);

        // do action
        this.hm.doHooks('dbm.create', model, query, dbUpdate, cb);
    }
    /**
     * Read from a specific resource by a specific query and limit the number of rows in the output
     * @param {string}              model   name of the resource that is to be read from
     * @param {Object}              query   MongoDB query that conditions the query of the read
     * @param {number}              limit   limit the amount of data returned
     * @param {MongoCallback<any>}  cb      callback that will handle output of the async database call
     * @returns {void}
     */
    public read(model: string, query: Object, limit: number, cb: MongoCallback<any>): void {

        // validate model exsists
        if (typeof this.rs.models[model] === 'undefined') {
            return cb(new Error('Model do not exsists'), 404);
        }

        // return action
        this.hm.doHooks('dbm.read', model, query, limit, cb);

    }
    /**
     * Update a resource based on some data and if a query is true
     * @param {string}              model   name of the resource that a instance is to be updated from
     * @param {Object}              query   MongoDB query that conditions the update
     * @param {*}                   update  the actual data to be used in the update
     * @param {MongoCallback<any>}  cb      callback that will handle output of the async database call
     * @returns {void}
     */
    public update(model: string, query: Object, update: any, cb: MongoCallback<any>): void {

        // validate model exsists
        if (typeof this.rs.models[model] === 'undefined') {
            return cb(new Error('Model do not exsists'), 404);
        }

        // id field should not be present in an update
        if (update.id) {
            throw new Error('id field is not allowed to be included in an update');
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
        this.hm.doHooks('dbm.update', model, query, dbUpdate, cb, dbCreate);

    }
    /**
     * Delete some resource given som conditions
     * @param {string}              model   name of the resource that something should be deleted from
     * @param {Object}              query   the conditions for the removal of an item
     * @param {MongoCallback<any>}  cb      callback that will handle output of the async database call
     */
    public delete(model: string, query: Object, cb: MongoCallback<any>): void {

        // validate model exsists
        if (typeof this.rs.models[model] === 'undefined') {
            return cb(new Error('Model do not exsists'), 404);
        }

        // return action
        this.hm.doHooks('dbm.delete', model, query, cb);
    }
}
