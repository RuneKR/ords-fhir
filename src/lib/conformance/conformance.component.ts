import {ConformResource}         from './models/conform-resource';
import {IConformance}            from '../../shared/models/hl7-fhir/schemas/conformance';
import {IStructureDefinition}    from '../../shared/models/hl7-fhir/schemas/structure-definition';

/**
 * String index of resources
 */
interface IResources {
    [key: string]: ConformResource;
}

/**
 * Manage all valueset and resources including structure definitions that an implementation conforms too
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
     * Populate standard conformance fields
     */
    constructor() {

        // IMPORT ALL FHIR-MODELS structures and add them
    }
    /**
     * Adds a resource to the stack of resources in an implementation
     * @param   {string}       Resource             the resource itself being added
     * @returns {void}
     */
    public addResource(resource: ConformResource): void {

        // init new holder
        this.resources[resource.name] = resource;
    }
    /**
     * Grap all known information about a resource or its structure definition
     * @param   {string}       resource             name of the resource
     * @param   {boolean}      structdef            flag if structdef should be returned or the resource
     * @returns {Resource | Structuredefenition}    all information about the resource in the requested form
     */
    public getResource(resource: string, structdef?: boolean): ConformResource | IStructureDefinition {

        // return content
        return this.resources[resource];
    }
    /**
     * Grap all known information about a valueset
     * @param   {string}       valueset                 name of the valueset
     * @returns {Valueset}     all information about the valueset
     */
    public getValueset(valueset: string): any {

        //return content
       
    }
    /**
     * Calculate the content of the conformance and send it back
     * @param   {string}       uri      uri that should be used for references in the conformance
     * @returns {IConformance}          
     */
    public getConformance(uri: string): IConformance {

        //return content
        return this.conformance;
       
    }
    
}
