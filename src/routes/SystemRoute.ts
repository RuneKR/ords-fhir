import {Router, Request, Response} from 'express';
import {ObjectID}                  from 'mongodb';
import {DBManager}                 from '../lib/DBManager';
import {DI}                        from '../lib/DependencyInjector';
import {requestparser}             from '../lib/Requestparser';
import * as valueSets              from '../resources/ValueSetList';

let tempRef: {[index: string]: any } = valueSets;    

export class SystemRoute {
    /**
     * Express routing elemeent
     * @type {Router}
     */
    public route: Router;
    /**
     * Binding the routes their function
     */
    constructor() {

        // setup router
        this.route = Router();

        // bind functions to router
        this.route.get('/ValueSet/:model', this.displayValueSet);    
        this.route.get('/StructureDefinition/:model', this.displayStructureDef);
        this.route.get('/Conformance', this.displayConStatement);

    }
    public displayValueSet(req: Request, res: Response): Response {        
        
        // not found any document
        if (tempRef[req.params.model] === 'undefined') {
            return res.status(404).send('Not found');
        } else {
            res.send(tempRef[req.params.model]);
        }
    }
    public displayStructureDef(req: Request, res: Response): Response {

        return res.send(StructureDefinition);       
    }
    public displayConStatement(req: Request, res: Response): Response {

        return res.send(Conformance);
    }
}
