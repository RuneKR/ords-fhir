import {Router, Request, Response} from 'express';
import {DI}                        from '../lib/DependencyInjector';
import {ResourceManager}           from '../lib/ResourceManager';

@DI.inject(ResourceManager)
export class SystemRoute {
    /**
     * Express routing elemeent
     * @type {Router}
     */
    public route: Router = Router();
    /**
     * Reference to database manager
     */
    private resourceManager: ResourceManager;
    /**
     * Binding the routes their function
     */
    constructor() {

        // bind functions to router
        this.route.get('/ValueSet/:model', this.displayValueSet.bind(this));    
        this.route.get('/StructureDefinition/:model', this.displayStructureDef.bind(this));
        this.route.get('/Conformance', this.displayConStatement.bind(this));

    }
    
    public displayValueSet(req: Request, res: Response): Response {        
        
        // not found any document
        if (this.resourceManager.models[req.params.model] === 'undefined') {
            return res.status(404).send('Not found');
        } else {
            return res.send(this.resourceManager.models[req.params.model]);
        }
    }
    
    public displayStructureDef(req: Request, res: Response): Response {
        
        return res.send('nothing');
      
    }
    
    public displayConStatement(req: Request, res: Response): Response {        
     
            return res.send('nothing');
    }
}
