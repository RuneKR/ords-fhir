import { ElementDefinition, Enforce } from 'ts-objectschema';
export declare class Reference {
    reference: ElementDefinition;
    display: ElementDefinition;
    constructor(data: {
        [key: string]: any;
    }, validate: Enforce);
}
export interface IReference {
}
