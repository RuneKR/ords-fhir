// external
import { DatabaseLib } from 'ords-db';

// internal
import { IConformance, IRestResource } from './lib/schemas/conformance';

/**
 * String index of resources
 */
interface IImplemented {
    [key: string]: {
        restConformance: IRestResource
        resource: DatabaseLib.DatabaseResource;
    };
}

/**
 * Manage all valueset and resources including structure definitions that an implementation conforms too
 */
export class ConformanceConfig {
    /**
     * The raw content of the conformance
     */
    public conformance: IConformance;
    /**
     * General rest conformance for all resources
     */
    public generalResourceConformance: IRestResource;
    /**
     * General rest conformance for all resources
     */
    public generalRestConformance: any;    //DO SOMETHING ELSE HERE WITH MODEL
    /**
     * Avalable resources and constom conformance for these
     */
    private implemented: IImplemented = {};
    /**
     * Create empty conformance component
     */
    constructor() {

        // standard values for the conformance for all resources
        this.generalResourceConformance = {
            type: '*'
        };

        // set general rest conformance
        this.generalRestConformance = {};

        // standard value for conformance
        this.conformance = {
            acceptUnknown: 'no',
            contact: [],
            format: ['json'],
            profile: [],
            rest: [this.generalRestConformance]
        };
    }
    /**
     * Adds a resource to the stack of resources in an implementation
     * @param   {string}       Resource             the resource itself being added
     * @returns {void}
     */
    public addResource(resource: DatabaseLib.DatabaseResource, conformance: IRestResource): void {

        // init new holder for implemented resource and save reference to it
        this.implemented[resource.name] = {
            resource: resource,
            restConformance: conformance
        };
    }
}
