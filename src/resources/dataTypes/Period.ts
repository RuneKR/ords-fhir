import {Validator, DateTime, ElementDefinition, PopulationLevel} from 'ts-objectschema';
import {KeyStringObject} from '../../lib/interfaces';

export class Period extends Validator {
    public start: ElementDefinition = {
        required: false,
        search: false,
        type: DateTime
    }
    public end: ElementDefinition = {
        required: false,
        search: false,
        type: DateTime
    }
    constructor(data: KeyStringObject, validate: PopulationLevel) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
