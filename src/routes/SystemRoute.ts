import {Router, Request, Response} from 'express';
import {ObjectID}                  from 'mongodb';
import {DBManager}                 from '../lib/DBManager';
import {DI}                        from '../lib/DependencyInjector';
import * as valueSets              from '../resources/ValueSetList';
import {StructureDefinition}       from '../resources/StructureDefinition';
import {conformance}               from '../resources/Conformance';

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
        this.route.get('/ValueSet/:model', this.displayValueSet.bind(this));    
        this.route.get('/StructureDefinition/:model', this.displayStructureDef.bind(this));
        this.route.get('/Conformance', this.displayConStatement.bind(this));

    }
    
    public displayValueSet(req: Request, res: Response): Response {        
        
        // not found any document
        if (tempRef[req.params.model] === 'undefined') {
            return res.status(404).send('Not found');
        } else {
            return res.send(tempRef[req.params.model]);
        }
    }
    
    public displayStructureDef(req: Request, res: Response): Response {
        
        return res.send('nothing');
      
    }
    
    public displayConStatement(req: Request, res: Response): Response {        
     
            return res.send(conformance);
    }
}
