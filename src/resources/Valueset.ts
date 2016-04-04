import {String, Boolean, Validator, ElementDefinition, PopulationLevel} from 'ts-objectschema';
import {DomainResource} from './DomainResource';
import {KeyStringObject} from '../lib/interfaces';

// backbone elements
class ConceptValue extends Validator {
    public code: ElementDefinition = {
        required: false,
        search: true,
        type: String
    };
    public display: ElementDefinition = {
        required: false,
        search: true,
        type: String
    };
    public abstract: ElementDefinition = {
        required: false,
        search: true,
        type: Boolean
    };
    public constructor(data: KeyStringObject) {

        // do validation command
        super();
        super.populate(data, PopulationLevel.required);

    }
}

class CodeSystem extends Validator {
    public system: ElementDefinition = {
        required: false,
        search: true,
        type: String
    };
    public version: ElementDefinition = {
        required: false,
        search: true,
        type: String
    };
    public concept: ElementDefinition = {
        required: false,
        search: true,
        type: [ConceptValue]
    };
    public constructor(data: KeyStringObject) {

        // do validation command
        super();
        super.populate(data, PopulationLevel.required);

    }
}

// actual class
export class Valueset extends DomainResource {
    public codeSystem: ElementDefinition = {
        required: false,
        search: true,
        type: CodeSystem
    };
    public constructor(data: KeyStringObject) {

        // do validation command
        super();
        super.populate(data, PopulationLevel.required);

    }
    public isInValueSet(code: string): boolean {
        // searches the valueset for a code

        return true;
    }
}
