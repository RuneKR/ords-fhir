import {OperationOutcome}       from    './models/operation-outcome';

export class OperationOutcomeComponent {
    public httpcode: number;
    public issue: {
        code: string,
        diagnostics?: string,
        severity: string
    };
    constructor(code: number, issue: OperationOutcome) {

        // check if codes are okay
    }
}
