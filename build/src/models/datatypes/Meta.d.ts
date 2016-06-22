import { ElementDefinition, Enforce } from 'ts-objectschema';
export declare class Meta {
    versionId: ElementDefinition;
    lastUpdated: ElementDefinition;
    profile: ElementDefinition;
    security: ElementDefinition;
    tag: ElementDefinition;
    constructor(data: {
        [key: string]: any;
    }, validate: Enforce);
}
