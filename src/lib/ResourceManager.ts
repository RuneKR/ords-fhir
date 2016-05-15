import * as models                  from '../resources/ModelList';
import * as valueSets               from '../resources/valueSetList';
import * as dataTypes               from '../resources/dataTypeList';

import {IConformance, Conformance}  from '../resources/Conformance';
import {Enforce}                    from 'ts-objectschema';

/**
 * Manage every resource in the application
 */
export class ResourceManager {
    /**
     * Container of all active models by their name
     * @type {{[key: string]: any}}
     */
    public models: { [key: string]: any } = models;
    /**
     * Container of all active valueSets by their name
     * @type {{[key: string]: any}}
     */
    public valueSets: { [key: string]: any } = valueSets;
    /**
     * Container of all active dataTypes by their name
     * @type {{[key: string]: any}}
     */
    public dataTypes: { [key: string]: any } = dataTypes;
    /**
     * Instanceiated conformance resource
     */
    public conformance: Conformance;
    /**
     * Build the conformance
     * @param   {IConformance}  conformance     conformance to be builded
     * @returns {Void}
     */
    public buildConformance(conformance: IConformance): void {

        this.conformance = new Conformance(conformance, Enforce.required);
    }
}
