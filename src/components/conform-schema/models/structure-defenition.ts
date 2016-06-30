import {ElementDefinition}  from    './element-definition';
import {IDomainResource}    from    './domain-resource';

export interface IStructureDefenition extends IDomainResource {
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
