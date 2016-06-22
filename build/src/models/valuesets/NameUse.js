"use strict";
var ts_objectschema_1 = require('ts-objectschema');
var NameUse = (function () {
    function NameUse() {
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
                    code: 'anonymous',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'old',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'maiden',
                    display: 'string'
                }
            ],
            system: process.env.domain + '/ValueSet/NameUse',
            version: '1.0.0'
        };
    }
    return NameUse;
}());
exports.NameUse = NameUse;
exports.nameUse = new ts_objectschema_1.Valueset(new NameUse());
