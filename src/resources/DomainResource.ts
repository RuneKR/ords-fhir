import {datatypes, ElementDefinition, decorators} from 'ts-objectschema';
import {Meta} from './dataTypes/Meta';

@decorators.validate
export class DomainResource {
    public id: ElementDefinition = {
        required: false,
        type: datatypes.String
    };
    public meta: ElementDefinition = {
        required: false,
        type: Meta
    };
    public language: ElementDefinition = {
        required: false,
        type: datatypes.String
    };
}
