export interface IOperationOutcomeComponent {
    code: string;
    diagnostics?: string;
    severity: string;
}

export class OperationOutcomeComponent {
    public httpcode: number;
    public issue: {
        code: string,
        diagnostics?: string,
        severity: string
    };
    constructor(code: number, issue: IOperationOutcomeComponent) {

        // check if codes are okay
    }
}
