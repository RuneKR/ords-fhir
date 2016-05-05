import {String, Boolean, Validator, ElementDefinition, enforce} from 'ts-objectschema';
import {DomainResource} from './DomainResource';

// backbone elements
class ConceptValue extends Validator {
    public code: ElementDefinition = {
        required: false,
        type: String
    };
    public display: ElementDefinition = {
        required: false,
        type: String
    };
    public abstract: ElementDefinition = {
        required: false,
        type: Boolean
    };
    public constructor(data: {[key: string]: any}) {

        // do validation command
        super();
        super.populate(data, enforce.required);

    }
}

class CodeSystem extends Validator {
    public system: ElementDefinition = {
        required: false,
        type: String
    };
    public version: ElementDefinition = {
        required: false,
        type: String
    };
    public concept: ElementDefinition = {
        required: false,
        type: [ConceptValue]
    };
    public constructor(data: {[key: string]: any}) {

        // do validation command
        super();
        super.populate(data, enforce.required);

    }
}

// actual class
export class Valueset extends DomainResource {
    public codeSystem: ElementDefinition = {
        required: false,
        type: CodeSystem
    };
    public constructor(data: {[key: string]: any}) {

        // do validation command
        super();
        super.populate(data, enforce.required);

    }
    public isInValueSet(code: string): boolean {
        // searches the valueset for a code

        return true;
    }
}
