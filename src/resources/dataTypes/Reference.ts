import {Validator, ElementDefinition, PopulationLevel} from 'ts-objectschema';
import {KeyStringObject} from '../../lib/interfaces';

export class Reference extends Validator {
    public reference: ElementDefinition = {
        required: false,
        search: false,
        type: String
    }
    public display: ElementDefinition = {
        required: false,
        search: false,
        type: String
    };

    constructor(data: KeyStringObject, validate: PopulationLevel) {

        // do validation command
        super();
        super.populate(data, validate);
    }
}
