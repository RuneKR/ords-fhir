import * as ts                  from 'ts-objectschema';
import {CodeableConcept}        from '../dataTypes/CodeableConcept';
import {issueSeverity}          from '../valueSets/IssueSeverity';
import {issueType}              from '../valueSets/issueType';

export class Issue {
    public severity: ts.ElementDefinition = {
        binding: new ts.Binding(ts.BindingStrength.required, 'Description of valueset', issueSeverity),
        required: true,
        type: ts.datatypes.Code
    };
    public code: ts.ElementDefinition = {
        binding: new ts.Binding(ts.BindingStrength.required, 'Description of valueset', issueType),
        required: true,
        type: ts.datatypes.Code
    };
    public details: ts.ElementDefinition = {
        required: false,
        type: CodeableConcept
    };
    public diagnostics: ts.ElementDefinition = {
        required: false,
        type: ts.datatypes.String
    };
    public location: ts.ElementDefinition = {
        required: false,
        type: [ts.datatypes.String]
    };
}

@ts.decorators.autoValidate(ts.Enforce.required)
export class OperationOutcome {

    public issue: ts.ElementDefinition = {
        required: true,
        type: Issue
    };
    public httpcode: ts.ElementDefinition = {
        required: true,
        type: Number
    };
    public constructor(data: { [key: string]: any }) {

        // do nothing
    }
}
