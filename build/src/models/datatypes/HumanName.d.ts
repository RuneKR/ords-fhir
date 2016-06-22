import { ElementDefinition, Enforce } from 'ts-objectschema';
export declare class HumanName {
    use: ElementDefinition;
    text: ElementDefinition;
    family: ElementDefinition;
    given: ElementDefinition;
    prefix: ElementDefinition;
    period: ElementDefinition;
    constructor(data: {
        [key: string]: any;
    }, validate: Enforce);
}
