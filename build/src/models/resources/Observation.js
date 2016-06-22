"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var domain_resource_1 = require('./domain-resource');
var CodeableConcept_1 = require('../dataTypes/CodeableConcept');
var Identifier_1 = require('../dataTypes/Identifier');
var Observation = (function (_super) {
    __extends(Observation, _super);
    function Observation(data, validate) {
        // do validation command
        _super.call(this);
        this.identifier = {
            required: false,
            type: Identifier_1.Identifier
        };
        this.status = {
            required: true,
            type: String
        };
        this.category = {
            required: false,
            type: CodeableConcept_1.CodeableConcept
        };
    }
    return Observation;
}(domain_resource_1.DomainResource));
exports.Observation = Observation;
