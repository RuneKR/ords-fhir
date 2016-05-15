import * as models                  from '../resources/ModelList';
import * as valueSets               from '../resources/valueSetList';
import * as dataTypes               from '../resources/dataTypeList';

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
}
