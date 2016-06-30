import {ElementDefinition}  from    './element-definition';
import {DomainResource}    from    './domain-resource';

export interface StructureDefenition extends DomainResource {
    snapshot: {
        element: Array<ElementDefinition>
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
