/// <reference path='../../typings/tsd.d.ts' />

import {ObjectID} from 'mongodb';
import {Router, Request, Response} from 'express';
import {dbm} from '../lib/DBManager';
import {requestparser} from '../lib/Requestparser';

export class InstanceRoute {
    /**
     * Express routing elemeent
     * @type {Router}
     */
    public route: Router = Router();
    constructor() {
        
        // parse info
        requestparser.bodyParser(this.route);

        // bind model to router
        this.route.get('/:model/:id([0-9a-f]{24})', this.read);
        this.route.get('/:model/:id([0-9a-f]{24})/:vid', this.vread);
        this.route.put('/:model/:id([0-9a-f]{24})', this.update);
        this.route.delete('/:model/:id([0-9a-f]{24})', this.delete);
    }

    /**
     * Read a specific instance of an model
     * @param req
     * @param res
     */
    public read(req: Request, res: Response): void {

        // read from connection
        dbm.read(
            req.params.model, 
            {   id: { $eq: new ObjectID(req.params.id) } }, 
            1, 
            (err: Error, docs: any) => {

            // report error
            if (err) {
                return res.status(docs).send(err.toString());
            }

            // not found any document
            if (docs.length === 0) {
                return res.status(404).send('No document found');
            }

            // if meta data is specified then use that in return
            if (docs[0].meta) {

                // set response headers of version
                if (docs[0].meta.versionId) {
                    res.set({
                        'ETag': 'W/"' + docs[0].meta.versionId + '"'
                    });
                }

                // set response headers of last updated
                if (docs[0].meta.lastUpdated) {
                    res.set({
                        'Last-Modified': docs[0].meta.lastUpdated
                    });
                }
            }

            // send resulting doc back
            res.send(docs[0]);
        });
    }

    /**
     * Read a specific version of a resource instance
     * @param req
     * @param res
     */
    public vread(req: Request, res: Response): void {

        // read from connection
        dbm.read(
            req.params.model, 
            { id: { $eq: new ObjectID(req.params.id) },
            'meta.versionId': { $eq: req.params.vid } }, 
            1, 
            (err: Error, docs: any) => {

            // report error
            if (err) {
                return res.status(docs).send(err.toString());
            }

            // not found any document
            if (docs.length === 0) {
                return res.status(404).send('That version of the document is not found');
            }

            // if meta data is specified then use that in return
            if (docs[0].meta) {

                // set response headers
                if (docs[0].meta.versionId) {
                    res.set({
                        'ETag': 'W/"' + docs[0].meta.versionId + '"'
                    });
                }

                // set response headers of last updated
                if (docs[0].meta.lastUpdated) {
                    res.set({
                        'Last-Modified': docs[0].meta.lastUpdated
                    });
                }
            }

            // send found doc back
            res.send(docs[0]);
        });
    }

    /**
     * Update a specific resource instance
     * @param req
     * @param res
     */
    public update(req: Request, res: Response): void {
        
        // do update
        dbm.update(
            req.params.model, 
            {   id: { $eq: new ObjectID(req.params.id) }    }, 
            req.body, 
            (err: Error, doc: any) => {
            
            // report err
            if (err) {
                return res.status(doc).send(err.toString());
            }
            
            // if meta data is specified then use that in return
            if (doc.meta) {

                // set response headers
                if (doc.meta.versionId) {

                    // set response headers of last updated
                    res.set({
                        'ETag': 'W/"' + doc.meta.versionId + '"'
                    });
                    
                    // an insert has occurred report if so
                    if (doc.meta.versionId === 0) {
                        res.set({
                            'Location': '/' + req.params.model + '/' + req.params.id
                        });
                        res.status(201);   
                    }
                }

                // set header for last modified
                if (doc.meta.lastUpdated) {
                    res.set({
                        'Last-Modified': doc.meta.lastUpdated
                    });
                }
            }

            // return result to user
            res.send(doc);
        });
    }

    /**
     * Delete a specific resource instance
     * @param req
     * @param res
     */
    public delete(req: Request, res: Response): void {
        
        // do update
        dbm.delete(
            req.params.model, 
            { id: { $eq: new ObjectID(req.params.id) }}, 
            (err: Error, doc: any) => {
            
            // report err
            if (err) {
                return res.status(doc).send(err.toString());
            }
            
            if (doc) {
                return res.status(204).send('OK');
            } else {
                return res.status(409).send('Allready deleted');
            }
            
        });
    }
}
