"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AddressUse_1 = require('../valueSets/AddressUse');
var ts_objectschema_1 = require('ts-objectschema');
var ContactPoint = (function () {
    function ContactPoint(data, validate) {
        // do nothing
        this.use = {
            binding: new ts_objectschema_1.Binding(ts_objectschema_1.BindingStrength.required, 'Description of valueset', AddressUse_1.addressUse),
            required: false,
            type: ts_objectschema_1.datatypes.String
        };
        // fortsæt herfra!!!
        this.text = {
            required: false,
            type: ts_objectschema_1.datatypes.String
        };
    }
    ContactPoint = __decorate([
        ts_objectschema_1.decorators.validate
    ], ContactPoint);
    return ContactPoint;
}());
exports.ContactPoint = ContactPoint;
