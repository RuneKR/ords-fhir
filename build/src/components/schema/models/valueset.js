"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Datatype = require('./data-types');
var schema_component_1 = require('../schema.component');
var ConceptValue = (function () {
    /**
     * Crease a new codeValue with data parsed to the class
     * @param {{[key: string]: any}}    data        data to be set as a valueset
     * @param {Enforce}                 validate    level of validation to be applied
     */
    function ConceptValue(data, validate) {
        /**
         * Name of the system
         * @type {ElementDefinition}
         */
        this.code = {
            required: false,
            type: Datatype.String
        };
        /**
         * Name of the system
         * @type {ElementDefinition}
         */
        this.display = {
            required: false,
            type: Datatype.String
        };
        /**
         * Defitiontion of the code
         * @type {ElementDefinition}
         */
        this.definition = {
            required: false,
            type: Datatype.String
        };
        /**
         * Name of the system
         * @type {ElementDefinition}
         */
        this.abstract = {
            required: false,
            type: Datatype.Boolean
        };
        /**
         * Subsystem
         * @type {ElementDefinition}
         */
        this.concept = {
            required: false,
            type: [ConceptValue]
        };
        // do nothing
    }
    return ConceptValue;
}());
/**
 * System of codes that a value can have
 */
var CodeSystem = (function () {
    /**
     * Crease a new codeSystem  with data parsed to the class
     * @param {{[key: string]: any}}    data        data to be set as a valueset
     * @param {Enforce}                 validate    level of validation to be applied
     */
    function CodeSystem(data, validate) {
        /**
         * Name of the system
         * @type {ElementDefinition}
         */
        this.system = {
            required: false,
            type: Datatype.String
        };
        /**
         * Version of the system
         * @type {ElementDefinition}
         */
        this.version = {
            required: false,
            type: Datatype.String
        };
        /**
         * Values or codes the system can contain
         * @type {ElementDefinition}
         */
        this.concept = {
            required: false,
            type: [ConceptValue]
        };
        // do nothing
    }
    CodeSystem = __decorate([
        schema_component_1.SchemaComponent
    ], CodeSystem);
    return CodeSystem;
}());
/**
 * Valuset that a binding can be set to
 * @class Valueset
 */
var Valueset = (function () {
    /**
     * Creates a new valueset with data parsed to the class
     * @param {{[key: string]: any}}    data    data to be set as a valueset
     */
    function Valueset(data) {
        /**
         * codesystem in use
         * @type {ElementDefinition}
         */
        this.codeSystem = {
            required: true,
            type: CodeSystem
        };
        // nothing
    }
    /**
     * Validates if value is within the valueset
     * @param   {any}     value       value to be looked for in dataset
     * @returns {bolean}  the indication of the presence of that value in the dataset
     */
    Valueset.prototype.isInValueSet = function (value, strength) {
        // obs: Only works for codeSystem right now
        var searchPaths = value.split('.');
        // check every entry in the code system (THIS IS SLOW) do something better
        function recrusive(path) {
            var needle = searchPaths.shift();
            var feedback = false;
            var concept;
            path.concept.every(function (data) {
                // if code match and is not abstract
                if (data.code === needle && data.abstract === false) {
                    feedback = true;
                    concept = data.concept;
                    return false;
                }
                else {
                    return true;
                }
            });
            // continue sub search if needed
            if (feedback === true && searchPaths.length !== 0) {
                // no more searches are possible
                if (concept === undefined) {
                    return false;
                }
                return recrusive(concept);
            }
            return feedback;
        }
        return recrusive(this.codeSystem);
    };
    Valueset = __decorate([
        schema_component_1.SchemaComponent
    ], Valueset);
    return Valueset;
}());
exports.Valueset = Valueset;
