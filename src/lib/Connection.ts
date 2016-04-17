/// <reference path='../../typings/tsd.d.ts' />

import {MongoCallback}      from 'mongodb';
import * as fs              from 'fs';
import {PopulationLevel}    from 'ts-objectschema';
import {StringMapAny}       from './Interfaces';

/**
 * Interface for a DbCon module in order to provide interoperability with the ConnectionBase
 */
export interface DbCon {
    read(model: string, query: Object, limit: number, cb: MongoCallback<any>): void;
    vread(model: string, version: number, cb: MongoCallback<any>): void;
    update(model: string, query: Object, dbUpdate: Object, cb: MongoCallback<any>, dbCreate: Object): void;
    create(model: string, query: Object, dbUpdate: Object, cb: MongoCallback<any>): void;
    delete(model: any, query: Object, cb: MongoCallback<any>): void;
    createIndex(model: string, path: string): void;
}

/**
 * Base for the connection to any database
 */
export class ConnectionBase {
    /**
     * Conected database
     * @type {DbCon}
     */
    public db: DbCon;
    /**
     * Container of models by their name
     * @type {StringMapAny}
     */
    public models: StringMapAny;
    /**
     * 
     */
    constructor() {

        // init models
        this.models = {};
    }
    /**
     * init the connect to mongodb by supplying a open db socket
     */
    public init(db: any): void {
        // holder for meta data
        let meta: Array<string>;
        let name: string;

        // save the database
        this.db = db;

        // read all models
        fs.readdir('build/resources/models', (err: Error, files: Array<string>) => {

            // debug cant find folders
            if (err) {
                throw err;
            }

            // foreach found file
            files.forEach((file: string) => {
                meta = file.split('.');

                name = meta[0];

                // keep javascript models
                if (meta[1] === 'js') {
                    // ensure index
                    this.db.createIndex(name, 'id');
                    // save model
                    this.models[name] = require('../resources/models/' + name)[name];
                }
            });
        });
    }

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
export const con: ConnectionBase = new ConnectionBase();
