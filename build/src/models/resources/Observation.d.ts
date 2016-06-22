import { DomainResource } from './domain-resource';
import { ElementDefinition, Enforce } from 'ts-objectschema';
export declare class Observation extends DomainResource {
    identifier: ElementDefinition;
    status: ElementDefinition;
    category: ElementDefinition;
    constructor(data: {
        [key: string]: any;
    }, validate: Enforce);
}
