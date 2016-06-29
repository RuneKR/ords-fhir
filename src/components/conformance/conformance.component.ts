import {Resource}               from './models/Resource';
import {Valueset}               from './models/valueset';
import {Structuredefenition}    from './models/structuredefenition';
import {IConformance}           from './models/conformance';

/**
 * String index of resources
 */
export interface IResources {
    [key: string]: Resource;
}

/**
 * String index of valuesets
 */
export interface IValuesets {
    [key: string]: Valueset;
}

/**
 * Manage conformance
 */
export class ConformanceComponent {
    /**
     * All resources avalable in the implementation
     */
    public conformance: IConformance;
    /**
     * All resources avalable in the implementation
     */
    private resources: IResources = {};
    /**
     * All Valuesets avalable in the implementation
     */
    private valuesets: IValuesets = {};
    /**
     * Populate standard conformance fields
     */
    constructor(conf: IConformance) {

        // bind reference to conformance
        this.conformance = conf;

        //add custom fields

    }
    /**
     * Adds a valueset to the stack of valuesets in this implementation
     * @param   {string}       Resource             the resource itself being added
     * @returns {void}
     */
    public addValueset(valueset: Valueset): void {

        // to acces .name that is speficied in all classes
        let get: any = valueset;

        //add to conformance

        // init new holder but get.name whould not work here
        this.valuesets[get.name] = valueset;
    }
    /**
     * Adds a resource to the stack of resources in this implementation and create a structuredefenition of it
     * @param   {string}       Resource             the resource itself being added
     * @returns {void}
     */
    public addResource(resource: Resource): void {

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
    public getResource(resource: string, structdef?: boolean): Resource | Structuredefenition {

        // return content
        return this.resources[resource];
    }
    /**
     * Grap all known information about a valueset
     * @param   {string}       valueset                 name of the valueset
     * @param   {boolean}      structdef                flag if structdef should be returned of that resource
     * @returns {Valueset | Structuredefenition}        all information about the valueset
     */
    public getValueset(valueset: string, structdef?: boolean): Valueset | Structuredefenition {

        // return content
        return this.valuesets[valueset];
    }
}
