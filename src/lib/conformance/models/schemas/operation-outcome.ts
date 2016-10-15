export interface IOperationOutcome {

}

export class OperationOutcome {
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
