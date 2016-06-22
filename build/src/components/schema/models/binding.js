"use strict";
/**
 * Binding of a value
 */
var Binding = (function () {
    /**
     * Constructs a new binding based on the input
     */
    function Binding(strength, description, valueSet) {
        // save values
        this.strength = strength;
        this.description = description;
        this.valueSet = valueSet;
    }
    return Binding;
}());
exports.Binding = Binding;
