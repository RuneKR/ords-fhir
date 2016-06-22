import { DomainResource } from './domain-resource';
import { ElementDefinition, Enforce } from 'ts-objectschema';
export declare class Patient extends DomainResource {
    identifier: ElementDefinition;
    active: ElementDefinition;
    name: ElementDefinition;
    address: ElementDefinition;
    constructor(data: {
        [key: string]: any;
    }, validate: Enforce);
}
