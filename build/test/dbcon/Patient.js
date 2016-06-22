"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var index_1 = require('../../src/index');
var Patient = (function (_super) {
    __extends(Patient, _super);
    function Patient() {
        _super.apply(this, arguments);
        this.name = 'Patient';
    }
    return Patient;
}(index_1.SchemaModels.Resource));
exports.Patient = Patient;
