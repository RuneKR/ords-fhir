import { Resource, Valueset } from '../schema/schema.models';
import { Structuredefenition } from './models/structuredefenition';
import { Conformance } from './models/conformance';
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
export declare class ConformanceComponent {
    /**
     * All resources avalable in the implementation
     */
    conformance: Conformance;
    /**
     * All resources avalable in the implementation
     */
    private resources;
    /**
     * All Valuesets avalable in the implementation
     */
    private valuesets;
    /**
     * Populate standard conformance fields
     */
    constructor(conf: Conformance);
    /**
     * Adds a valueset to the stack of valuesets in this implementation
     * @param   {string}       Resource             the resource itself being added
     * @returns {void}
     */
    addValueset(valueset: Valueset): void;
    /**
     * Adds a resource to the stack of resources in this implementation and create a structuredefenition of it
     * @param   {string}       Resource             the resource itself being added
     * @returns {void}
     */
    addResource(resource: Resource): void;
    /**
     * Grap all known information about a resource
     * @param   {string}       resource             name of the resource
     * @param   {boolean}      structdef            flag if structdef should be returned of that resource
     * @returns {Resource | Structuredefenition}    all information about the resource
     */
    getResource(resource: string, structdef?: boolean): Resource | Structuredefenition;
    /**
     * Grap all known information about a valueset
     * @param   {string}       valueset                 name of the valueset
     * @param   {boolean}      structdef                flag if structdef should be returned of that resource
     * @returns {Valueset | Structuredefenition}        all information about the valueset
     */
    getValueset(valueset: string, structdef?: boolean): Valueset | Structuredefenition;
}
