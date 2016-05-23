import {decorators, datatypes, ElementDefinition, Enforce} from 'ts-objectschema';

@decorators.validate
export class Period {
    public start: ElementDefinition = {
        required: false,
        type: datatypes.DateTime
    };
    public end: ElementDefinition = {
        required: false,
        type: datatypes.DateTime
    };
    constructor(data: {[key: string]: any}, validate: Enforce) {

        // do nothing

    }
}
