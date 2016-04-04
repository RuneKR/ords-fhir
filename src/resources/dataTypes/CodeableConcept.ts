import {String, Validator, ElementDefinition, PopulationLevel} from 'ts-objectschema';
import {Coding} from './Coding';
import {KeyStringObject} from '../../lib/interfaces';

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
    public constructor(data: KeyStringObject, validate: PopulationLevel) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
