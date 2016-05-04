import {DomainResource} from '../DomainResource';
import {CodeableConcept} from '../dataTypes/CodeableConcept';
import {ElementDefinition, PopulationLevel} from 'ts-objectschema';
import {Identifier} from '../dataTypes/Identifier';

export class Observation extends DomainResource {

    public identifier: ElementDefinition = {
        required: false,
        search: true,
        type: Identifier
    };

    public status: ElementDefinition = {
        required: true,
        search: false,
        type: String
    };

    public category: ElementDefinition = {
        required: false,
        search: false,
        type: CodeableConcept
    };
    public constructor(data: { [key: string]: any }, validate: PopulationLevel) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
