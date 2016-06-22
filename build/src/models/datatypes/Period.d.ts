import { ElementDefinition, Enforce } from 'ts-objectschema';
export declare class Period {
    start: ElementDefinition;
    end: ElementDefinition;
    constructor(data: {
        [key: string]: any;
    }, validate: Enforce);
}
