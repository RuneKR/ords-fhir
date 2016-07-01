import {ConformSchemaModels}    from '../../conform-schema';

export interface ValueSet extends ConformSchemaModels.DomainResource {
    /**
     * Values: ConformanceResourceStatus 
     * Type: code
     */
    status: string;
}
