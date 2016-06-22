import { ElementDefinition, Enforce } from 'ts-objectschema';
export declare class ContactPoint {
    use: ElementDefinition;
    text: ElementDefinition;
    constructor(data: {
        [key: string]: any;
    }, validate: Enforce);
}
export interface IContactPoint {
}
