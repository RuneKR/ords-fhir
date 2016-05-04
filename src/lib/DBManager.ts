/// <reference path='../../typings/tsd.d.ts' />

import {MongoCallback}      from 'mongodb';
import {PopulationLevel}    from 'ts-objectschema';
import {StringMapAny}       from './Interfaces';
import * as models          from '../resources/ResourceList';

/**
 * Base for the connection to any database
 */
export class DBManager {
    /**
     * Container of models by their name
     * @type {StringMapAny}
     */
    public models: StringMapAny = models;
    /**
     * (description)
     * @param {string} model (description)
     * @param {Object} query (description)
     * @param {number} limit (description)
     * @param {MongoCallback<any>} cb (description)
     * @returns {void} (description)
     */
    public read(model: string, query: Object, limit: number, cb: MongoCallback<any>): void {

        // validate model exsists
        if (typeof this.models[model] === 'undefined') {
            return cb(new Error('Model do not exsists'), 404);
        }

        // return action
        this.db.read(model, query, limit, cb);

    }
    /**
     * (description)
     * @param {string} model (description)
     * @param {*} version (description)
     * @param {MongoCallback<any>} cb (description)
     * @returns {void} (description)
     */
    public vread(model: string, version: any, cb: MongoCallback<any>): void {

        // validate model exsists
        if (typeof this.models[model] === 'undefined') {
            return cb(new Error('Model do not exsists'), 404);
        }

        // return action
        this.db.vread(model, version, cb);

    }
    /**
     * (description)
     * @param {string} model (description)
     * @param {Object} query (description)
     * @param {*} update (description)
     * @param {MongoCallback<any>} cb (description)
     * @returns {void} (description)
     */
    public update(model: string, query: Object, update: any, cb: MongoCallback<any>): void {

        // validate model exsists
        if (typeof this.models[model] === 'undefined') {
            return cb(new Error('Model do not exsists'), 404);
        }

        // id field should not be present in an update
        if (update.id) {
            throw new Error('id field is not allowed to be included in an update');
        }

        // do multiple validation one to check if we are doing an update and one to check if we are doing an create
        let dbUpdate: any = new this.models[model](update, PopulationLevel.all);
        let dbCreate: Object;

        // try to see if required could be done
        try {
            dbCreate = new this.models[model](update, PopulationLevel.required);
        } catch (e) {
            dbCreate = undefined;
        }

        // do action
        this.db.update(model, query, dbUpdate, cb, dbCreate);

    }
    /**
     * (description)
     * @param {string} model (description)
     * @param {Object} query (description)
     * @param {*} update (description)
     * @param {MongoCallback<any>} cb (description)
     * @returns {void} (description)
     */
    public create(model: string, query: Object, create: any, cb: MongoCallback<any>): void {

        // validate model exsists
        if (typeof this.models[model] === 'undefined') {
            return cb(new Error('Model do not exsists'), 404);
        }

        // do multiple validation one to check if we are doing an update and one to check if we are doing an create
        let dbUpdate: any = new this.models[model](create, PopulationLevel.required);

        // do action
        this.db.create(model, query, dbUpdate, cb);
    }
    /**
     * (description)
     * @param {string} model (description)
     * @param {Object} query (description)
     * @param {MongoCallback<any>} cb (description)
     * @returns {void} (description)
     */
    public delete(model: string, query: Object, cb: MongoCallback<any>): void {

        // validate model exsists
        if (typeof this.models[model] === 'undefined') {
            return cb(new Error('Model do not exsists'), 404);
        }

        // return action
        this.db.delete(model, query, cb);
    }
}

/**
 * Singleton of ConnectionBase
 */
export const dbm: DBManager = new DBManager();
