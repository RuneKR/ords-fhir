import { IValueset } from './i-valueset';
import { BindingStrength } from './binding-strength';
/**
 * Binding of a value
 */
export declare class Binding {
    /**
     * Strength of a binding
     * @type {BindingStrength}
     */
    strength: BindingStrength;
    /**
     * Descrition of the binding
     * @type {string}
     */
    description: string;
    /**
     * Reference to a given valueset
     * @type {Valueset}
     */
    valueSet: IValueset;
    /**
     * Constructs a new binding based on the input
     */
    constructor(strength: BindingStrength, description: string, valueSet: any);
}
