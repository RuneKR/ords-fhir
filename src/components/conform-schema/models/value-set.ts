import {DomainResource}    from    './domain-resource';

export interface ValueSet extends DomainResource {
    /**
     * Values: ConformanceResourceStatus 
     * Type: code
     */
    status: string;
}
