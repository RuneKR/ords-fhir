import {ConformResource}            from '../../shared/models/resources/conform-resource';
import {IConformance, IResourceOP}  from '../../shared/models/hl7-fhir/schemas/conformance';
import {IStructureDefinition}       from '../../shared/models/hl7-fhir/schemas/structure-definition';
import {IValueSet}                  from '../../shared/models/hl7-fhir/schemas/value-set';

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
    [key: string]: IResourceOP;
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
    private resourceRestOperations: RestOperations = {};
    /**
     * Adds a resource to the stack of resources in an implementation
     * @param   {string}       Resource             the resource itself being added
     * @returns {void}
     */
    public addResource(resource: ConformResource): void {

        // init new holder
        this.resources[resource.name] = resource;
        this.resourceRestOperations[resource.name] = {};
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
     * Calculate the content of the conformance and send it back
     * @param   {string}       uri      uri that should be used for references in the conformance
     * @returns {IConformance}          
     */
    public getConformance(uri: string): IConformance {

        return this.conformance;
    }
    /**
     * Get the supported rest operation of the specific resource or all (wildcard)
     * @param   {string}        name    name of resource or the wildcard *
     */
    public getResourceRestOPeration(name: string): IResourceOP {

        return this.resourceRestOperations[name];
     }
}
