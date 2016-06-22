"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var tso = require('ts-objectschema');
var BoundleType_1 = require('../valueSets/BoundleType');
var Link = (function () {
    function Link() {
        this.relation = {
            required: true,
            type: tso.datatypes.String
        };
        this.url = {
            required: true,
            type: tso.datatypes.Uri
        };
    }
    Link = __decorate([
        tso.decorators.validate
    ], Link);
    return Link;
}());
exports.Link = Link;
var Entry = (function () {
    function Entry() {
        this.link = {
            required: false,
            type: Link
        };
        this.fulluri = {
            required: true,
            type: tso.datatypes.Uri
        };
        this.resource = {
            definition: 'The contained resource',
            required: true,
            type: tso.datatypes.Any
        };
    }
    Entry = __decorate([
        tso.decorators.validate
    ], Entry);
    return Entry;
}());
exports.Entry = Entry;
var Boundle = (function () {
    function Boundle(data) {
        this.type = {
            binding: new tso.Binding(tso.BindingStrength.required, 'Boundle type', BoundleType_1.boundleType),
            required: true,
            type: tso.datatypes.String
        };
        this.total = {
            required: false,
            type: tso.datatypes.Number
        };
        this.link = {
            required: false,
            type: Link
        };
        this.entry = {
            required: false,
            type: Entry
        };
        // do nothing
    }
    Boundle = __decorate([
        tso.decorators.autoValidate(tso.Enforce.required)
    ], Boundle);
    return Boundle;
}());
exports.Boundle = Boundle;
