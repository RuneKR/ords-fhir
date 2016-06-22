"use strict";
var ts_objectschema_1 = require('ts-objectschema');
var IdentifierUse = (function () {
    function IdentifierUse() {
        this.codeSystem = {
            concept: [
                {
                    abstract: true,
                    code: 'usual',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'official',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'temp',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'secondary',
                    display: 'string'
                }
            ],
            system: process.env.domain + '/ValueSet/IdentifierUse',
            version: '1.0.0'
        };
    }
    return IdentifierUse;
}());
exports.IdentifierUse = IdentifierUse;
exports.identifierUse = new ts_objectschema_1.Valueset(new IdentifierUse());
