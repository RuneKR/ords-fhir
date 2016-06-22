import { ElementDefinition, Enforce } from 'ts-objectschema';
export declare class Address {
    use: ElementDefinition;
    text: ElementDefinition;
    constructor(data: {
        [key: string]: any;
    }, validate: Enforce);
}
