"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var schema_1 = require('../../components/schema');
var Meta_1 = require('../dataTypes/Meta');
var DomainResource = (function () {
    function DomainResource() {
        this.id = {
            required: false,
            type: schema_1.SchemaModels.DataTypes.String
        };
        this.meta = {
            required: false,
            type: Meta_1.Meta
        };
        this.language = {
            required: false,
            type: schema_1.SchemaModels.DataTypes.String
        };
    }
    DomainResource = __decorate([
        schema_1.SchemaComponent
    ], DomainResource);
    return DomainResource;
}());
exports.DomainResource = DomainResource;
