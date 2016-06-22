import * as tso from 'ts-objectschema';
export interface IBoundle {
    type: string;
    total?: number;
    link?: Array<{
        relation: string;
        url: string;
    }>;
}
export declare class Link {
    relation: tso.ElementDefinition;
    url: tso.ElementDefinition;
}
export declare class Entry {
    link: tso.ElementDefinition;
    fulluri: tso.ElementDefinition;
    resource: tso.ElementDefinition;
}
export declare class Boundle {
    type: tso.ElementDefinition;
    total: tso.ElementDefinition;
    link: tso.ElementDefinition;
    entry: tso.ElementDefinition;
    constructor(data: IBoundle);
}
