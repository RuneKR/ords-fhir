"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ts_objectschema_1 = require('ts-objectschema');
var Coding_1 = require('./Coding');
var Meta = (function () {
    function Meta(data, validate) {
        // do nothing
        this.versionId = {
            required: false,
            type: ts_objectschema_1.datatypes.Id
        };
        this.lastUpdated = {
            required: true,
            type: ts_objectschema_1.datatypes.Instant
        };
        this.profile = {
            required: false,
            type: [ts_objectschema_1.datatypes.Uri]
        };
        this.security = {
            required: false,
            type: [ts_objectschema_1.datatypes.Uri]
        };
        this.tag = {
            required: false,
            type: [Coding_1.Coding]
        };
    }
    Meta = __decorate([
        ts_objectschema_1.decorators.validate
    ], Meta);
    return Meta;
}());
exports.Meta = Meta;
