"use strict";
var ts_objectschema_1 = require('ts-objectschema');
var MimeType = (function () {
    function MimeType() {
        this.codeSystem = {
            concept: [
                {
                    abstract: true,
                    code: 'xml',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'json',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'mime type',
                    display: 'string'
                }
            ],
            system: process.env.DOMAIN + '/ValueSet/MimeType',
            version: '1.0.0'
        };
    }
    return MimeType;
}());
exports.MimeType = MimeType;
exports.mimeType = new ts_objectschema_1.Valueset(new MimeType());
