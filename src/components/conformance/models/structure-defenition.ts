import {ConformSchemaModels}    from '../../conform-schema';

export interface StructureDefenition extends ConformSchemaModels.DomainResource {
    snapshot: {
        element: Array<ConformSchemaModels.ElementDefinition>
    };
    /**
     * Actually type is URL
     */
    url: string;
    /**
     * Eather this is an abstract
     */
    abstract: boolean;
}
