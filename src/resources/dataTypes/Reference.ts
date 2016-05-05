import {Validator, ElementDefinition, enforce} from 'ts-objectschema';

export class Reference extends Validator {
    public reference: ElementDefinition = {
        required: false,
        type: String
    };
    public display: ElementDefinition = {
        required: false,
        type: String
    };
    constructor(data: {[key: string]: any}, validate: enforce) {

        // do validation command
        super();
        super.populate(data, validate);
    }
}
