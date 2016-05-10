import {decorators, datatypes, ElementDefinition, Enforce} from 'ts-objectschema';

@decorators.validate
export class Reference {
    public reference: ElementDefinition = {
        required: false,
        type: datatypes.String
    };
    public display: ElementDefinition = {
        required: false,
        type: datatypes.String
    };
    constructor(data: {[key: string]: any}, validate: Enforce) {

        // do nothing
    }
}
