import {IValueset}          from    './i-valueset';
import {BindingStrength}    from    './binding-strength';
/**
 * Binding of a value
 */
export class Binding {
    /**
     * Strength of a binding
     * @type {BindingStrength}
     */
    public strength: BindingStrength;
    /**
     * Descrition of the binding
     * @type {string}
     */
    public description: string;
    /**
     * Reference to a given valueset
     * @type {Valueset}
     */
    public valueSet: IValueset;
    /**
     * Constructs a new binding based on the input
     */
    constructor(strength: BindingStrength, description: string, valueSet: any) {

        // save values
        this.strength = strength;
        this.description = description;
        this.valueSet = valueSet;
    }
}