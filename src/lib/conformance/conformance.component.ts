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
     * List of valuesets supported
     */
    private valuesets: Valuesets = {};
    /**
     * List of rest operations supported by resource
     */
    private resourceRestConformance: RestOperations = {};
    /**
     * Adds a resource to the stack of resources in an implementation
     * @param   {string}       Resource             the resource itself being added
     * @returns {void}
     */
    public addResource(resource: ConformResource): void {

        // init new holder
        this.resources[resource.restConformance.type] = resource;
        this.resourceRestConformance[resource.restConformance.type] = resource.restConformance;
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
     * Grap all known information about a valueset
     * @param   {string}       valueset   name of the valueset
     * @returns {Valueset}                all information about the valueset
     */
    public getValueset(valueset: string): IValueSet {

        return this.valuesets[valueset];
    }
    /**
     * All a valueset to the list of supported valuesets
     * @param   {String}          name                 name of the valueset
     * @param   {IValueSet}       valueset             the valueset
     */
    public addValueset(name: string, valueset: IValueSet): void {

        this.valuesets[name] = valueset;
    }
    /**
     * Calculate the content of the conformance and return it back
     * @param   {string}       uri      uri that should be used for references in the conformance
     * @returns {IConformance}          
     */
    public getConformance(uri: string): IConformance {

        return this.conformance;
    }
}
