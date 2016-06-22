"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NameUse_1 = require('../valueSets/NameUse');
var Period_1 = require('./Period');
var ts_objectschema_1 = require('ts-objectschema');
var HumanName = (function () {
    function HumanName(data, validate) {
        // do nothing
        this.use = {
            binding: new ts_objectschema_1.Binding(ts_objectschema_1.BindingStrength.required, 'Description of valueset', NameUse_1.nameUse),
            required: false,
            type: ts_objectschema_1.datatypes.String
        };
        this.text = {
            required: false,
            type: ts_objectschema_1.datatypes.String
        };
        this.family = {
            required: false,
            type: [ts_objectschema_1.datatypes.String]
        };
        this.given = {
            required: false,
            type: [ts_objectschema_1.datatypes.String]
        };
        this.prefix = {
            required: false,
            type: [ts_objectschema_1.datatypes.String]
        };
        this.period = {
            required: false,
            type: Period_1.Period
        };
    }
    HumanName = __decorate([
        ts_objectschema_1.decorators.validate
    ], HumanName);
    return HumanName;
}());
exports.HumanName = HumanName;
