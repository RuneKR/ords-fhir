import {DomainResource}    from './domain-resource';
import {ElementDefinition} from './element-definition';

export interface IStructureDefinition extends DomainResource {
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
