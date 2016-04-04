import {String, Code, Boolean, Validator, Uri, ElementDefinition, PopulationLevel} from 'ts-objectschema';
import {KeyStringObject} from '../../lib/Interfaces';

export class Coding extends Validator {

    public system: ElementDefinition = {
        required: false,
        search: true,
        type: Uri
    };
    public version: ElementDefinition = {
        required: false,
        search: true,
        type: String
    };
    public display: ElementDefinition = {
        required: false,
        search: true,
        type: String
    };
    public userSelected: ElementDefinition = {
        required: false,
        search: true,
        type: Boolean
    };
    public code: ElementDefinition = {
        required: false,
        search: true,
        type: Code
    };
    public constructor(data: KeyStringObject, validate: PopulationLevel) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}