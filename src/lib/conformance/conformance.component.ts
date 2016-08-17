import {ConformResource}                from '../../shared/models/resources/conform-resource';
import {IConformance, IRestResource}    from '../../shared/models/hl7-fhir/schemas/conformance';
import {IValueSet}                      from '../../shared/models/hl7-fhir/schemas/value-set';

/**
 * String index of resources
 */
interface IResources {
    [key: string]: ConformResource;
}

/**
 * String index of valuesets
 */
interface Valuesets {
    [key: string]: IValueSet;
}

/**
 * String index of valuesets
 */
interface RestOperations {
    [key: string]: IRestResource;
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
     * Avalable resources and constom conformance for these
     */
    private resources: IResources = {};
    /**
     * General rest conformance for all resources
     */
    private resourceRestConformance: IRestResource;
    /**
     * Create empty conformance component
     */
    constructor() {
        
        // standard value
        this.resourceRestConformance = {};
    }
    /**
     * Adds a resource to the stack of resources in an implementation
     * @param   {string}       Resource             the resource itself being added
     * @returns {void}
     */
    public addResource(resource: ConformResource): void {

        // init new holder and save reference to it
        this.resources[resource.restConformance.type] = resource;

    }
    /**
     * Grap all known information about a resource type
     * @param   {string}       type     type of the resource
     * @returns {ConformResource}       all information about the resource in the requested form
     */
    public getResource(type: string): ConformResource {

        // return content
        return this.resources[type];
    }
    /**
     * Calculate the content of the conformance and return it back
     * @param   {string}       uri      uri that should be used for references in the conformance
     * @returns {IConformance}          
     */
    public getConformance(uri: string): IConformance {


        // NOT DONE

        return this.conformance;
    }
}
