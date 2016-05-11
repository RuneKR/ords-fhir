import {Router, Request, Response} from 'express';
import {ObjectID}                  from 'mongodb';
import {DBManager}                 from '../lib/DBManager';
import {DI}                        from '../lib/DependencyInjector';
import {requestparser}             from '../lib/Requestparser';
import * as valueSets              from '../resources/ValueSetList';


export class SystemRoute {
    /**
     * Express routing elemeent
     * @type {Router}
     */
    public route: Router;
    
    /**
     * Database connection management singleton
     */
    @DI.injectProperty(DBManager)
    private dbm: DBManager;
    
    /**
     * Binding the routes their function
     */
    constructor() {

        // setup router
        this.route = Router();

        // bind functions to router
        this.route.get('/ValueSet/:model', this.displayAddressUse);
        this.route.get('/ValueSet/:model', this.displayConformanceResourceStatus);
        this.route.get('/ValueSet/:model', this.displayIdentifierUse);
        this.route.get('/ValueSet/:model', this.displayNameUse);        
        this.route.get('/StructureDefinition/:model', this.displayStructureDef);
        this.route.get('/Conformance/:model', this.displayConStatement);

    }
    public displayAddressUse(req: Request, res: Response): void {

        this.displayAddressUse.call(
            req.param.model,
            {   id: { $eq: new ObjectID(req.params.id) } }, 
            1,
            (err: Error, docs: any) => {
              
            // report error
            if (err) {
                return res.status(docs).send(err.toString());
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
            
            res.send(docs[0]);     
            }); 
    }
    public displayConformanceResourceStatus(req: Request, res: Response): Response {

        return res.send(ConformanceResourceStatus);      
    }
    public displayIdentifierUse(req: Request, res: Response): Response {

        return res.send(IdentifierUse);      
    }
    public displayNameUse(req: Request, res: Response): Response {

        return res.send(NameUse);      
    }
    public displayStructureDef(req: Request, res: Response): Response {

        return res.send(StructureDefinition);       
    }
    public displayConStatement(req: Request, res: Response): Response {

        return res.send(Conformance);
    }
}
