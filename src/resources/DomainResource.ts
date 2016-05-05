import {String, ElementDefinition, Validator} from 'ts-objectschema';
import {Meta} from './dataTypes/Meta';

export class DomainResource extends Validator {
    public id: ElementDefinition = {
        required: false,
        type: String
    };
    public meta: ElementDefinition = {
        required: false,
        type: Meta
    };
    public language: ElementDefinition = {
        required: false,
        type: String
    };
}
