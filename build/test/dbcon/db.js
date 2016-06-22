"use strict";
var patientdata_1 = require('./patientdata');
/**
 * Demo in memmory database
 */
var DB = (function () {
    function DB() {
        this.Patient = patientdata_1.data;
    }
    return DB;
}());
exports.DB = DB;
exports.instance = new DB();
