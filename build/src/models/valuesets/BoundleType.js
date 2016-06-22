"use strict";
var ts_objectschema_1 = require('ts-objectschema');
var BoundleType = (function () {
    function BoundleType() {
        this.codeSystem = {
            concept: [
                {
                    abstract: true,
                    code: 'home',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'work',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'temp',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'old',
                    display: 'string'
                },
            ],
            system: process.env.domain + '/ValueSet/AddressUse',
            version: '1.0.0'
        };
    }
    return BoundleType;
}());
exports.BoundleType = BoundleType;
exports.boundleType = new ts_objectschema_1.Valueset(new BoundleType());
