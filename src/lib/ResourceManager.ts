import * as fs                      from 'fs';

// this looks strange acording to linting but have too
/* import {datatypes}                from 'ts-objectschema';   // import all from this module
export let Boolean:     any = datatypes.Boolean;
export let Code:        any = datatypes.Code;
export let DateTime:    any = datatypes.DateTime;
export let Id:          any = datatypes.Id;
export let Instant:     any = datatypes.Instant;
export let Number:      any = datatypes.Number;
export let String:      any = datatypes.String;
export let Uri:         any = datatypes.Uri;
*/

/**
 * Manage every resource in the application
 */
export class ResourceManager {
    /**
     * Container of all active models by their name
     * @type {{[key: string]: any}}
     */
    public rest: { [key: string]: any } = models;
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
     * Container of all active dataTypes by their name
     * @type {{[key: string]: any}}
     */
    public internal: { [key: string]: any } = dataTypes;
    /**
     * Generatee all the fields
     */
    constructor(){
       // fs.readdirSync(path[, options])
    }
}
