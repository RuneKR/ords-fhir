import {DomainResource}    from './domain-resource';

export interface IValueSet extends DomainResource {
    /**
     * Values: ConformanceResourceStatus 
     * Type: code
     */
    status: string;
}

export interface ValueSet extends DomainResource {
    /**
     * Values: ConformanceResourceStatus 
     * Type: code
     */
    status: string;
}
