import {String, ElementDefinition, Validator} from 'ts-objectschema';
import {Meta} from './dataTypes/Meta';

export class DomainResource extends Validator {
    public id: ElementDefinition = {
        required: false,
        search: true,
        type: String
    };
    public meta: ElementDefinition = {
        required: false,
        search: true,
        type: Meta
    };
    public language: ElementDefinition = {
        required: false,
        search: true,
        type: String
    };
}
