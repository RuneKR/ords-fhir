"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Identifier_1 = require('../dataTypes/Identifier');
var HumanName_1 = require('../dataTypes/HumanName');
var Address_1 = require('../dataTypes/Address');
var domain_resource_1 = require('./domain-resource');
var Patient = (function (_super) {
    __extends(Patient, _super);
    function Patient(data, validate) {
        // do validation command
        _super.call(this);
        this.identifier = {
            required: false,
            type: Identifier_1.Identifier
        };
        this.active = {
            required: false,
            type: Boolean
        };
        this.name = {
            required: true,
            type: HumanName_1.HumanName
        };
        this.address = {
            required: true,
            type: Address_1.Address
        };
    }
    return Patient;
}(domain_resource_1.DomainResource));
exports.Patient = Patient;
