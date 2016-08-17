import {IDomainResource}    from './domain-resource';
import {ElementDefinition} from './element-definition';

export interface IStructureDefinition extends IDomainResource {
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
