import {Validator, DateTime, ElementDefinition, enforce} from 'ts-objectschema';

export class Period extends Validator {
    public start: ElementDefinition = {
        required: false,
        type: DateTime
    };
    public end: ElementDefinition = {
        required: false,
        type: DateTime
    };
    constructor(data: {[key: string]: any}, validate: enforce) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
