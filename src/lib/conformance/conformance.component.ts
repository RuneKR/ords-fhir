// external
import {Resource}                       from 'ords-db';

// internal
import {IConformance, IRestResource}    from './models/schemas/conformance';

/**
 * String index of resources
 */
interface IResources {
    [key: string]: Resource;
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

        // standard values for the conformance for all resources
        this.resourceRestConformance = {
            type: '*'
        };

        // standard value for conformance
        this.conformance = {
            acceptUnknown: 'no',
            contact: [],
            format: ['json'],
            profile: [],
            rest: []
        };
    }
    /**
     * Adds a resource to the stack of resources in an implementation
     * @param   {string}       Resource             the resource itself being added
     * @returns {void}
     */
    public addResource(resource: Resource, conformance: IRestResource): void {

        // init new holder and save reference to it
        this.resources[resource.restConformance.type] = resource;

        // do stuff with conformance too

    }
    /**
     * Grap all known information about a resource type
     * @param   {string}       type     type of the resource
     * @returns {ConformResource}       all information about the resource in the requested form
     */
    public getResource(type: string): Resource {

        // return content
        return this.resources[type];
    }
    /**
     * Calculate the content of the conformance and return it back
     * @returns {IConformance}          
     */
    public getConformance(): IConformance {

        // reset calculated rest
        this.conformance.rest = [];

        // for all resources
        for (let resource in this.resources) {

            // check that it is not inherited
            if (this.resources.hasOwnProperty(resource)) {

                // push conformance into rest
                this.conformance.rest.push(this.resources[resource].restConformance);
            }
        }

        // Todo: Create an instance of the conformance resource and check if it fails.

        return this.conformance;
    }
}
