"use strict";
var ts_objectschema_1 = require('ts-objectschema');
var IssueSeverity = (function () {
    function IssueSeverity() {
        this.codeSystem = {
            concept: [
                {
                    abstract: false,
                    code: 'fatal',
                    definition: 'The issue caused the action to fail, and no further checking could be performed.',
                    display: 'Fatal',
                },
                {
                    abstract: false,
                    code: 'error',
                    definition: 'The issue is sufficiently important to cause the action to fail.',
                    display: 'Error',
                },
                {
                    abstract: false,
                    code: 'warning',
                    definition: 'The issue is not important enough to cause the action to fail, but may cause it to be performed suboptimally or in a way that is not as desired.',
                    display: 'Warning'
                },
                {
                    abstract: false,
                    code: 'information',
                    definition: 'The issue has no relation to the degree of success of the action.',
                    display: 'Information'
                },
            ],
            system: process.env.domain + '/ValueSet/IssueSeverity',
            version: '1.0.0'
        };
    }
    return IssueSeverity;
}());
exports.IssueSeverity = IssueSeverity;
exports.issueSeverity = new ts_objectschema_1.Valueset(new IssueSeverity());
