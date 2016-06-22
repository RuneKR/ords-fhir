import { ElementDefinition, Enforce } from 'ts-objectschema';
export declare class Coding {
    system: ElementDefinition;
    version: ElementDefinition;
    display: ElementDefinition;
    userSelected: ElementDefinition;
    code: ElementDefinition;
    constructor(data: {
        [key: string]: any;
    }, validate: Enforce);
}
