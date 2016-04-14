import {String, Validator, ElementDefinition, PopulationLevel} from 'ts-objectschema';
import {Coding} from './Coding';

export class CodeableConcept extends Validator {
    public coding: ElementDefinition = {
        required: false,
        search: false,
        type: [Coding]
    };
    public text: ElementDefinition = {
        required: false,
        search: false,
        type: String
    };
    public constructor(data: {[key: string]: any}, validate: PopulationLevel) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
