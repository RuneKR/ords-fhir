import {DomainResource} from './DomainResource';
import {CodeableConcept} from '../dataTypes/CodeableConcept';
import {ElementDefinition, Enforce} from 'ts-objectschema';
import {Identifier} from '../dataTypes/Identifier';

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
