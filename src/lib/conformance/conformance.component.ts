import {ConformResource}         from './models/conform-resource';
import {IConformance}            from '../../fhir-models/schemas/conformance';
import {IStructureDefinition}    from '../../fhir-models/schemas/structure-definition';

/**
 * String index of resources
 */
export interface IResources {
    [key: string]: ConformResource;
}

// IMPORT ALL FHIR-MODELS structures

/**
     * Get information about the requested resource from the request params
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void} 
     */
    public getResourceFromParams(req: Request, res: Response, next: NextFunction): void {

        // grap info about the current route
        let model: any = this.cc.getResource(req.params.resource);

        // check that resource actually exists
        if (model === undefined) {

            // throw some error
        }

        delete req.params.resource;

        // set reference to that
        req.resource = model;

        // go next
        next();
    }

/**
 * Manage conformance of implementation
 */
export class ConformanceComponent {
    /**
     * The raw content of the conformance
     */
    public conformance: IConformance;
    /**
     * Avalable resources
     */
    private resources: IResources = {};
    /**
     * Rest operations avalable
     */
    public restOperations: any; //Put correct reference
    /**
     * Populate standard conformance fields
     */
    constructor(conf: IConformance) {

        // bind reference to conformance
        this.conformance = conf;

        //add custom fields

    }
    /**
     * Adds a resource to the stack of resources in this implementation and create a structuredefenition of it
     * @param   {string}       Resource             the resource itself being added
     * @returns {void}
     */
    public addResource(resource: ConformResource): void {

        // to acces .name that is speficied in all classes
        let get: any = resource;

        //add to conformance

        // init new holder
        this.resources[get.name] = resource;
    }
    /**
     * Grap all known information about a resource
     * @param   {string}       resource             name of the resource
     * @param   {boolean}      structdef            flag if structdef should be returned of that resource
     * @returns {Resource | Structuredefenition}    all information about the resource
     */
    public getResource(resource: string, structdef?: boolean): ConformResource | IStructureDefinition {

        // return content
        return this.resources[resource];
    }
    /**
     * Grap all known information about a valueset
     * @param   {string}       valueset                 name of the valueset
     * @param   {boolean}      structdef                flag if structdef should be returned of that resource
     * @returns {Valueset}     all information about the valueset
     */
    public getValueset(valueset: string, structdef?: boolean): any {

        //return content
       
    }
    /**
     * Calculate the content of the conformance and send it back
     * @param   {string}       valueset                 name of the valueset
     * @param   {boolean}      structdef                flag if structdef should be returned of that resource
     * @returns {Valueset}     all information about the valueset
     */
    public getConformance(uri: string): IConformance {

        //return content
        return this.conformance;
       
    }
}
