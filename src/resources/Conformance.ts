import {DomainResource} from './DomainResource';
import {datatypes, ElementDefinition, Enforce} from 'ts-objectschema';

export class Conformance extends DomainResource {

    public date: ElementDefinition = {
        required: true,
        type: datatypes.DateTime
    };
    public kind: ElementDefinition = {
        required: true,
        type: datatypes.DateTime
    };
    public acceptUnknown: ElementDefinition = {
        required: true,
        type: datatypes.Boolean
    };
    public constructor(data: { [key: string]: any }, validate: Enforce) {

        // do validation command
        super();
    }
}

/**
 * Interface for conformance
 */
export interface IConformance extends DomainResource {
    date: any;
    kind: any;
    acceptUnknown: boolean;
}

export let conformance: Conformance;
