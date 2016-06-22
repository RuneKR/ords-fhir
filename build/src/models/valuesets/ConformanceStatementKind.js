"use strict";
var ts_objectschema_1 = require('ts-objectschema');
var ConformanceStatementKind = (function () {
    function ConformanceStatementKind() {
        this.codeSystem = {
            concept: [
                {
                    abstract: true,
                    code: 'instance',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'capability',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'requirements',
                    display: 'string'
                }
            ],
            system: process.env.DOMAIN + '/ValueSet/ConformanceStatementKind',
            version: '1.0.0'
        };
    }
    return ConformanceStatementKind;
}());
exports.ConformanceStatementKind = ConformanceStatementKind;
exports.conformanceStatementKind = new ts_objectschema_1.Valueset(new ConformanceStatementKind());
