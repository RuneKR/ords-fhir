"use strict";
var enforce_1 = require('../models/enforce');
/**
 * Methods for validation of an resource
 */
var Helper = (function () {
    function Helper() {
    }
    /**
     * Populate the instance of a Data with some data and validate the data
     * @param {Data}   data        data to be used in population and to be validated
     * @param {Enforce} validate    the level of of validation required
     * @param data
     */
    Helper.prototype.popAndValidate = function (data, validate) {
        var _this = this;
        var target = this;
        // if validation should occure for required fields
        if (validate === enforce_1.Enforce.required) {
            // loop fields to see if they are present and check for required fields
            Object.keys(target).forEach(function (key) {
                // validate it is a native to object prop
                if (target.hasOwnProperty(key)) {
                    // set the value
                    if (data[key] !== undefined) {
                        // binds the new value
                        _this.setValue(data, key);
                        // remove the key from provided data
                        delete data[key];
                    }
                    else if (target[key].required === true) {
                        // notify about error
                        throw new Error('Key ' + key + ': is required in the Data');
                    }
                    else {
                        delete target[key];
                    }
                }
            });
        }
        else if (validate === enforce_1.Enforce.exists) {
            Object.keys(this).forEach(function (key) {
                // validate it is a native to object prop
                if (_this.hasOwnProperty(key)) {
                    // set the value
                    if (data[key] !== undefined) {
                        _this.setValue(data, key);
                        // remove the key from provided data
                        delete data[key];
                    }
                    else {
                        delete target[key];
                    }
                }
            });
        }
        // check if any properties are left
        Object.keys(data).forEach(function (key) {
            // no fields should be present so write that back
            throw new Error('Key ' + key + ': is not in the Data');
        });
    };
    /**
     * Bind value to key in this object
     * @param {Data}   data        data containing value to be set
     * @param {String}  key         key in data for value
     */
    Helper.prototype.setValue = function (data, key) {
        var _this = this;
        // value can take any form since it depend on the class tested
        var value;
        // reference to self
        var target = this;
        try {
            // is type an array?
            if (Array.isArray(target[key].type)) {
                // empty array
                value = [];
                // is provided data all so an array
                if (!Array.isArray(data[key])) {
                    throw new Error('not an array');
                }
                else {
                    // loop all the data
                    data[key].forEach(function (elm) {
                        // save correct value
                        value.push(_this.getValueFromType(target[key].type[0], elm, enforce_1.Enforce.required));
                    });
                }
            }
            else {
                // test if value type is okay
                value = this.getValueFromType(target[key].type, data[key], enforce_1.Enforce.required);
            }
            // check binding against valueset if a binding is set   
            if (target[key].binding !== undefined
                && target[key].binding.valueSet.isInValueSet(value, target[key].binding.strength) === false) {
                // notify that valueset is not okay
                throw new Error('Valuesets were not okay for ' + value + ' in ' + key);
            }
            // save value that is okay
            target[key] = value;
        }
        catch (e) {
            throw new Error(key + ': ' + e.toString());
        }
    };
    /**
     * Get the value from a type based on an initial value
     * @param {any}      type        type value shall be extracted from
     * @param {any}      value       value to be set to a type
     * @param {Enforce}  validate    level of validation to be done on the type
     */
    Helper.prototype.getValueFromType = function (type, value, validate) {
        // test if value type is okay and save it
        var temp = new type(value, validate);
        // some values have raw element use that
        if (typeof temp._OneValue !== 'undefined') {
            temp = temp._OneValue;
        }
        return temp;
    };
    return Helper;
}());
exports.Helper = Helper;
