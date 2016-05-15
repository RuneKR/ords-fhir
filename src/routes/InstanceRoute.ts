import {ObjectID}                  from 'mongodb';
import {Router, Request, Response} from 'express';
import {DBManager}                 from '../lib/DBManager';
import {DI}                        from '../lib/DependencyInjector';
import {Requestparser}             from '../lib/Requestparser';

@DI.inject(Requestparser, DBManager)
export class InstanceRoute {
    /**
     * Express routing elemeent
     * @type {Router}
     */
    public route: Router = Router();
    /**
     * Express routing elemeent
     * @type {Router}
     */
    public requestparser: Requestparser;
    /**
     * Database connection
     * @type {DBManager}
     */
    private dBManager: DBManager;
    /**
     * Binding the routes their function
     */
    constructor() {

        // bind model to router
        this.route.get('/:model/:id([0-9a-f]{24})', this.read.bind(this));
        this.route.put('/:model/:id([0-9a-f]{24})', this.requestparser.parseBody, this.update.bind(this));
        this.route.delete('/:model/:id([0-9a-f]{24})', this.delete);
    }
    /**
     * Read a specific instance of an model
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    public read(req: Request, res: Response): void {

        // read from connection
        this.dBManager.read(
            req.params.model, 
            {   id: { $eq: new ObjectID(req.params.id) } }, 
            1, 
            (err: Error, docs: any) => {

            // report error
            if (err) {
                return res.status(500).send(err);
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
     * Update a specific instance of a resource
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    public update(req: Request, res: Response): void {
        
        // do update
        this.dBManager.update(
            req.params.model, 
            {   id: { $eq: new ObjectID(req.params.id) }    }, 
            req.body, 
            (err: Error, doc: any) => {
            
            // report err
            if (err) {
                return res.status(500).send(err);
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
     * Delete a specific instance of an model
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    public delete(req: Request, res: Response): void {
        
        // do update
        this.dBManager.delete(
            req.params.model, 
            { id: { $eq: new ObjectID(req.params.id) }}, 
            (err: Error, doc: any) => {
            
            // report err
            if (err) {
                return res.status(doc).send(err);
            }
            
            if (doc) {
                return res.status(204).send('OK');
            } else {
                
                // There should be na error here
                return res.status(409).send('Allready deleted');
            }
            
        });
    }
}
