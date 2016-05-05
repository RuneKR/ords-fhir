import {String, Code, Boolean, Validator, Uri, ElementDefinition, enforce} from 'ts-objectschema';

export class Coding extends Validator {

    public system: ElementDefinition = {
        required: false,
        type: Uri
    };
    public version: ElementDefinition = {
        required: false,
        type: String
    };
    public display: ElementDefinition = {
        required: false,
        type: String
    };
    public userSelected: ElementDefinition = {
        required: false,
        type: Boolean
    };
    public code: ElementDefinition = {
        required: false,
        type: Code
    };
    public constructor(data: {[key: string]: any}, validate: enforce) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
