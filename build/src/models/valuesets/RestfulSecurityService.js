"use strict";
var ts_objectschema_1 = require('ts-objectschema');
var RestfulSecurityService = (function () {
    function RestfulSecurityService() {
        this.codeSystem = {
            concept: [
                {
                    abstract: true,
                    code: 'OAuth',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'SMART-on-FHIR',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'NTLM',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'Basic',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'Kerberos',
                    display: 'string'
                },
                {
                    abstract: true,
                    code: 'Certificates',
                    display: 'string'
                }
            ],
            system: process.env.DOMAIN + '/ValueSet/RestfulSecurityService',
            version: '1.0.0'
        };
    }
    return RestfulSecurityService;
}());
exports.RestfulSecurityService = RestfulSecurityService;
exports.restfulSecurityService = new ts_objectschema_1.Valueset(new RestfulSecurityService());
