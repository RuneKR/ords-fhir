import {IDomainResource}        from    './domain-resource';

export interface IRestResource {
    type: string;
}

/**
 * Content of a conformance
 */
export interface IConformance extends IDomainResource {
    version?: string;
    experimental?: boolean;
    publisher?: string;
    contact: Array<{
        name: string;
        telecom: any // IContactPoint;
    }>;
    date?: Date;
    description?: string;
    requirements?: string;
    copyright?: string;
    name?: string;
    status?: string;
    kind?: string;
    fhirVersion?: string;
    acceptUnknown: string;
    format: Array<string>;
    profile: Array<any>; //Array<IReference>;
    rest: any;      // set to any because of the depth pleas just look at how it is used in ConformanceManager
}
