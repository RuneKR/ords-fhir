"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var IdentifierUse_1 = require('../valueSets/IdentifierUse');
var Period_1 = require('./Period');
var Reference_1 = require('./Reference');
var ts_objectschema_1 = require('ts-objectschema');
var CodeableConcept_1 = require('./CodeableConcept');
var Identifier = (function () {
    function Identifier(data, validate) {
        // do nothing
        this.use = {
            binding: new ts_objectschema_1.Binding(ts_objectschema_1.BindingStrength.required, 'Description of valueset', IdentifierUse_1.identifierUse),
            required: false,
            type: ts_objectschema_1.datatypes.String
        };
        this.type = {
            binding: new ts_objectschema_1.Binding(ts_objectschema_1.BindingStrength.extensible, 'Description of valueset', IdentifierUse_1.identifierUse),
            required: false,
            type: CodeableConcept_1.CodeableConcept
        };
        this.system = {
            required: false,
            type: ts_objectschema_1.datatypes.Uri
        };
        this.value = {
            required: false,
            type: [ts_objectschema_1.datatypes.String]
        };
        this.period = {
            required: false,
            type: Period_1.Period
        };
        this.assigner = {
            required: false,
            type: Reference_1.Reference
        };
    }
    Identifier = __decorate([
        ts_objectschema_1.decorators.validate
    ], Identifier);
    return Identifier;
}());
exports.Identifier = Identifier;
