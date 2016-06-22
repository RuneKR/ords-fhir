export declare class OperationOutcome {
    httpcode: number;
    issue: {
        code: string;
        diagnostics?: string;
        severity: string;
    };
}
