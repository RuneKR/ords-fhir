// export IConformance and the Conformance itself

/**
 * Content of a conformance
 */
export class IConformance {
    public meta: any;
    public version: string;
    public experimental: boolean;
    public publisher: string;
    public contact: Array<{
        name: string;
        telecom: any // IContactPoint;
    }>;
    public date: Date;
    public description: string;
    public requirements: string;
    public copyright: string;
    public name: string;
    public status: string;
    public kind: string;
    public fhirVersion: string;
    public acceptUnknown: string;
    public format: Array<string>;       
    public profile: Array<any>; //Array<IReference>;
    public rest: any;      // set to any because of the depth pleas just look at how it is used in ConformanceManager
}
