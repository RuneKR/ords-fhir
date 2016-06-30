import {IDomainResource}    from    './domain-resource';

export interface IValueSet extends IDomainResource {
    /**
     * Values: ConformanceResourceStatus 
     * Type: code
     */
    status: string;
}
