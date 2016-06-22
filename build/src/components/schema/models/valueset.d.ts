import { ElementDefinition } from './element-definition';
import { IValueset } from './i-valueset';
import { BindingStrength } from './binding-strength';
/**
 * Valuset that a binding can be set to
 * @class Valueset
 */
export declare class Valueset implements IValueset {
    /**
     * codesystem in use
     * @type {ElementDefinition}
     */
    codeSystem: ElementDefinition;
    /**
     * Creates a new valueset with data parsed to the class
     * @param {{[key: string]: any}}    data    data to be set as a valueset
     */
    constructor(data: {
        [key: string]: any;
    });
    /**
     * Validates if value is within the valueset
     * @param   {any}     value       value to be looked for in dataset
     * @returns {bolean}  the indication of the presence of that value in the dataset
     */
    isInValueSet(value: string, strength: BindingStrength): boolean;
}
