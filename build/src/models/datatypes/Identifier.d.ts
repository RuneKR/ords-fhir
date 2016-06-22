import { ElementDefinition, Enforce } from 'ts-objectschema';
export declare class Identifier {
    use: ElementDefinition;
    type: ElementDefinition;
    system: ElementDefinition;
    value: ElementDefinition;
    period: ElementDefinition;
    assigner: ElementDefinition;
    constructor(data: {
        [key: string]: any;
    }, validate: Enforce);
}
