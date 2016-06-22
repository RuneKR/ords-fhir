import { Enforce } from '../models/enforce';
/**
 * Interface describing a Data
 */
export interface Data {
    [key: string]: any;
}
/**
 * Methods for validation of an resource
 */
export declare class Helper {
    /**
     * Populate the instance of a Data with some data and validate the data
     * @param {Data}   data        data to be used in population and to be validated
     * @param {Enforce} validate    the level of of validation required
     * @param data
     */
    popAndValidate(data: Data, validate: Enforce): void;
    /**
     * Bind value to key in this object
     * @param {Data}   data        data containing value to be set
     * @param {String}  key         key in data for value
     */
    setValue(data: Data, key: string): void;
    /**
     * Get the value from a type based on an initial value
     * @param {any}      type        type value shall be extracted from
     * @param {any}      value       value to be set to a type
     * @param {Enforce}  validate    level of validation to be done on the type
     */
    getValueFromType(type: any, value: any, validate: Enforce): any;
}
