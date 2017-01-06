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
export class ConformanceComponent {
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
    /**
     * Grap all known information about a resource type
     * @param   {string}       type     type of the resource
     */
    public getResource(type: string): DatabaseLib.DatabaseResource {

        // return content if it exists
        if (this.implemented[type] === undefined) {
            return undefined;
        } else {
            return this.implemented[type].resource;
        }
    }
    /**
     * Calculate the content of the conformance and return it back
     * @returns {IConformance}          
     */
    public getConformance(): IConformance {

        // reset calculated rest
        this.conformance.rest = [];

        // MERGE GENERAL WITH SPECIFIC KEYS FOR RESOURCES

        // for all resources
        for (let type in this.implemented) {

            // check that it is not inherited
            if (this.implemented.hasOwnProperty(type)) {

                // push conformance into rest
                this.conformance.rest.push(this.implemented[type].restConformance);
            }
        }

        // Todo: Create an instance of the conformance resource and check if it fails.
        // implement general conformance too

        return this.conformance;
    }
}
