"use strict";
/**
 * Different levels of validation to be Enforced
 */
(function (Enforce) {
    Enforce[Enforce['required'] = 0] = 'required';
    Enforce[Enforce['exists'] = 1] = 'exists';
    Enforce[Enforce['skip'] = 2] = 'skip';
})(exports.Enforce || (exports.Enforce = {}));
var Enforce = exports.Enforce;
;
