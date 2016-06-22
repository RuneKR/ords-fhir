import { ElementDefinition, Enforce } from 'ts-objectschema';
export declare class CodeableConcept {
    coding: ElementDefinition;
    text: ElementDefinition;
    constructor(data: {
        [key: string]: any;
    }, validate: Enforce);
}
