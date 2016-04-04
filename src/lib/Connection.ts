/// <reference path='../../typings/tsd.d.ts' />

import {Db, MongoCallback, Cursor} from 'mongodb';
import * as fs from 'fs';
import {PopulationLevel} from 'ts-objectschema';
import {KeyStringObject} from './interfaces';

class ConnectionBase {
    public db: Db;
    public models: KeyStringObject;
    constructor() {

        // init models
        this.models = {};
    }
    /**
     * init the connect to mongodb by supplying a open db socket
     */
    public init(db: Db): void {
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
                    this.db.collection(name).createIndex('id');
                    // save model
                    this.models[name] = require('../resources/models/' + name)[name];
                }
            });
        });
    }

    /**
     * FHIR requires id not _id field so we have to remove that field
     * 
     * @param {*} doc Mongodb document that need the field removed
     */
    public renameFields(doc: any): void {

        if (doc && doc._id) {
            delete doc._id;
        }
    }

    /**
     * (description)
     * 
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

        // disalbe id field
        let curs: Cursor = this.db.collection(model).find(query).limit(limit).project({ _id: 0 });
        curs.toArray(cb);

    }
    /**
     * (description)
     * 
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

        // look throughout the version collection of the model and disable id field
        let curs: Cursor = this.db.collection('v_' + model).find({ 'meta.versionId': { $eq: version } }).limit(1).project({ _id: 0 });
        curs.toArray(cb);
    }
    /**
     * (description)
     * 
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
        let dbUpdate: any = { $set: new this.models[model](update, PopulationLevel.all) };

        // try to see if required could be done
        try {
            let dbCreate: Object = new this.models[model](update, PopulationLevel.required);
            dbUpdate.$setOnInsert = dbCreate;

        } catch (e) {
            // do nothing
        }

        // update based on query or create new document
        this.db.collection(model).findOneAndUpdate(
            query,
            dbUpdate,
            { returnOriginal: false, upsert: true },
            (err: Error, doc: any) => {

                // parsing back doc.value because of this is how it is returned
                if (!err) {
                    this.renameFields(doc.value);
                    cb(err, doc.value);
                } else {
                    cb(err, doc);
                }
            });
    }
    /**
     * (description)
     * 
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
        let dbUpdate: any = { $setOnInsert: new this.models[model](create, PopulationLevel.required) };

        // update based on query or create new document
        this.db.collection(model).findOneAndUpdate(
            query,
            dbUpdate,
            { returnOriginal: false, upsert: true },
            (err: Error, doc: any) => {

                // parsing back doc.value because of this is how it is returned
                if (!err) {
                    this.renameFields(doc.value);
                    cb(err, doc.value);
                } else {
                    cb(err, doc);
                }
            });
    }
    /**
     * (description)
     * 
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

        // delete the one document based on the query. We dont need to rename _id field since it is not returned
        this.db.collection(model).findOneAndDelete(query, cb);
    }
    // not implemented yet
    // history() {}
}

export const con: ConnectionBase = new ConnectionBase();
