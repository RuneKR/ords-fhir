import {DomainResource} from './domain-resource';
import {CodeableConcept} from '../datatypes/codeable-concept';
import {ElementDefinition, Enforce} from 'ts-objectschema';
import {Identifier} from '../datatypes/identifier';

export class Observation extends DomainResource {

    public identifier: ElementDefinition = {
        required: false,
        type: Identifier
    };

    public status: ElementDefinition = {
        required: true,
        type: String
    };

    public category: ElementDefinition = {
        required: false,
        type: CodeableConcept
    };
    public constructor(data: { [key: string]: any }, validate: Enforce) {

        // do validation command
        super();
    }
}
