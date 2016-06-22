"use strict";
var ts_objectschema_1 = require('ts-objectschema');
var UnknownContentCode = (function () {
    function UnknownContentCode() {
        this.codeSystem = {
            concept: [
                {
                    abstract: true,
                    code: 'no',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'extentions',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'elements',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'both',
                    display: 'string'
                }
            ],
            system: process.env.DOMAIN + '/ValueSet/UnknownContentCode',
            version: '1.0.0'
        };
    }
    return UnknownContentCode;
}());
exports.UnknownContentCode = UnknownContentCode;
exports.unknownContentCode = new ts_objectschema_1.Valueset(new UnknownContentCode());
