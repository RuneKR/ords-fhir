import {Validator, DateTime, ElementDefinition, PopulationLevel} from 'ts-objectschema';

export class Period extends Validator {
    public start: ElementDefinition = {
        required: false,
        search: false,
        type: DateTime
    };
    public end: ElementDefinition = {
        required: false,
        search: false,
        type: DateTime
    };
    constructor(data: {[key: string]: any}, validate: PopulationLevel) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
