import {datatypes, ElementDefinition, decorators, Enforce} from 'ts-objectschema';

@decorators.validate
export class Coding {
    public system: ElementDefinition = {
        required: false,
        type: datatypes.Uri
    };
    public version: ElementDefinition = {
        required: false,
        type: datatypes.String
    };
    public display: ElementDefinition = {
        required: false,
        type: datatypes.String
    };
    public userSelected: ElementDefinition = {
        required: false,
        type: datatypes.Boolean
    };
    public code: ElementDefinition = {
        required: false,
        type: datatypes.Code
    };
    public constructor(data: {[key: string]: any}, validate: Enforce) {

        // do nothing

    }
}
