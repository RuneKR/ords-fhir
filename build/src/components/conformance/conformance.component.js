"use strict";
/**
 * Manage conformance
 */
var ConformanceComponent = (function () {
    /**
     * Populate standard conformance fields
     */
    function ConformanceComponent(conf) {
        /**
         * All resources avalable in the implementation
         */
        this.resources = {};
        /**
         * All Valuesets avalable in the implementation
         */
        this.valuesets = {};
        // bind reference to conformance
        this.conformance = conf;
        //add custom fields
    }
    /**
     * Adds a valueset to the stack of valuesets in this implementation
     * @param   {string}       Resource             the resource itself being added
     * @returns {void}
     */
    ConformanceComponent.prototype.addValueset = function (valueset) {
        // to acces .name that is speficied in all classes
        var get = valueset;
        //add to conformance
        // init new holder but get.name whould not work here
        this.valuesets[get.name] = valueset;
    };
    /**
     * Adds a resource to the stack of resources in this implementation and create a structuredefenition of it
     * @param   {string}       Resource             the resource itself being added
     * @returns {void}
     */
    ConformanceComponent.prototype.addResource = function (resource) {
        // to acces .name that is speficied in all classes
        var get = resource;
        //add to conformance
        // init new holder
        this.resources[get.name] = resource;
    };
    /**
     * Grap all known information about a resource
     * @param   {string}       resource             name of the resource
     * @param   {boolean}      structdef            flag if structdef should be returned of that resource
     * @returns {Resource | Structuredefenition}    all information about the resource
     */
    ConformanceComponent.prototype.getResource = function (resource, structdef) {
        // return content
        return this.resources[resource];
    };
    /**
     * Grap all known information about a valueset
     * @param   {string}       valueset                 name of the valueset
     * @param   {boolean}      structdef                flag if structdef should be returned of that resource
     * @returns {Valueset | Structuredefenition}        all information about the valueset
     */
    ConformanceComponent.prototype.getValueset = function (valueset, structdef) {
        // return content
        return this.valuesets[valueset];
    };
    return ConformanceComponent;
}());
exports.ConformanceComponent = ConformanceComponent;
