"use strict";
/**
 * Strength of the binding as required to be specificed by HL7 FHIR
 */
(function (BindingStrength) {
    BindingStrength[BindingStrength["required"] = 0] = "required";
    BindingStrength[BindingStrength["extensible"] = 1] = "extensible";
    BindingStrength[BindingStrength["preferred"] = 2] = "preferred";
    BindingStrength[BindingStrength["example"] = 3] = "example";
})(exports.BindingStrength || (exports.BindingStrength = {}));
var BindingStrength = exports.BindingStrength;
