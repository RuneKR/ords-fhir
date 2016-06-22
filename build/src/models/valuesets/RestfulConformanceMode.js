"use strict";
var ts_objectschema_1 = require('ts-objectschema');
var RestfulConformanceMode = (function () {
    function RestfulConformanceMode() {
        this.codeSystem = {
            concept: [
                {
                    abstract: true,
                    code: 'client',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'server',
                    display: 'string'
                }
            ],
            system: process.env.DOMAIN + '/ValueSet/RestfulConformanceMode',
            version: '1.0.0'
        };
    }
    return RestfulConformanceMode;
}());
exports.RestfulConformanceMode = RestfulConformanceMode;
exports.restfulConformanceMode = new ts_objectschema_1.Valueset(new RestfulConformanceMode());
