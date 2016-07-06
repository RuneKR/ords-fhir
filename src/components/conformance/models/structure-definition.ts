import {DomainResource}    from './domain-resource';
import {ElementDefinition} from './element-definition';

export interface StructureDefinition extends DomainResource {
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
