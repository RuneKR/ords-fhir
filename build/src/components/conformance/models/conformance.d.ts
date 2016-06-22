/**
 * Content of a conformance
 */
export declare class Conformance {
    meta: any;
    version: string;
    experimental: boolean;
    publisher: string;
    contact: Array<{
        name: string;
        telecom: any;
    }>;
    date: Date;
    description: string;
    requirements: string;
    copyright: string;
    name: string;
    status: string;
    kind: string;
    fhirVersion: string;
    acceptUnknown: string;
    format: Array<string>;
    profile: Array<any>;
    rest: any;
}
