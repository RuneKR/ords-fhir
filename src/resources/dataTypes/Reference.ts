import {Validator, ElementDefinition, PopulationLevel} from 'ts-objectschema';

export class Reference extends Validator {
    public reference: ElementDefinition = {
        required: false,
        search: false,
        type: String
    };
    public display: ElementDefinition = {
        required: false,
        search: false,
        type: String
    };
    constructor(data: {[key: string]: any}, validate: PopulationLevel) {

        // do validation command
        super();
        super.populate(data, validate);
    }
}
