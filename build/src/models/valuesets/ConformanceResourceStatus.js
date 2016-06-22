"use strict";
var ts_objectschema_1 = require('ts-objectschema');
var ConformanceResourceStatus = (function () {
    function ConformanceResourceStatus() {
        this.codeSystem = {
            concept: [
                {
                    abstract: true,
                    code: 'draft',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'active',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'retired',
                    display: 'string'
                }
            ],
            system: process.env.DOMAIN + '/ValueSet/ConformanceResourceStatus',
            version: '1.0.0'
        };
    }
    return ConformanceResourceStatus;
}());
exports.ConformanceResourceStatus = ConformanceResourceStatus;
exports.conformanceResourceStatus = new ts_objectschema_1.Valueset(new ConformanceResourceStatus());
