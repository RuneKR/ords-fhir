export class OperationOutcomeComponent {
    public httpcode: number;
    public issue: {
        code: string,
        diagnostics?: string,
        severity: string
    };
}
