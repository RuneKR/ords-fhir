import {Router, Request, Response} from 'express';
import {DBManager}                 from '../lib/DBManager';
import {DI}                        from '../lib/DependencyInjector';
import {requestparser}             from '../lib/Requestparser';
import {StructureDefinition}       from '../resources/StructureDefinition';
import {Conformance}               from '../resources/Conformance';
import {AddressUse}                from '../resources/valueSets/AddressUse';
import {ConformanceResourceStatus} from '../resources/valueSets/ConformanceResourceStatus';
import {IdentifierUse}             from '../resources/valueSets/IdentifierUse';
import {NameUse}                   from '../resources/valueSets/NameUse';


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
        this.route.get('/ValueSet/:model', this.displayValueSets);
        this.route.get('/StructureDefinition/:model', this.displayStructureDef);
        this.route.get('/Conformance/:model', this.displayConStatement);

    }
    public displayValueSets(req: Request, res: Response): Response {

        return res.send([AddressUse, ConformanceResourceStatus, IdentifierUse, NameUse]);      
    }
    public displayStructureDef(req: Request, res: Response): Response {

        return res.send(StructureDefinition);       
    }
    public displayConStatement(req: Request, res: Response): Response {

        return res.send(Conformance);
    }
}
