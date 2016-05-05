import {String, Validator, ElementDefinition, enforce} from 'ts-objectschema';
import {Coding} from './Coding';

export class CodeableConcept extends Validator {
    public coding: ElementDefinition = {
        required: false,
        type: [Coding]
    };
    public text: ElementDefinition = {
        required: false,
        type: String
    };
    public constructor(data: {[key: string]: any}, validate: enforce) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
