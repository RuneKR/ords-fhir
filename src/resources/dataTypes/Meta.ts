import {decorators, datatypes, ElementDefinition, Enforce} from 'ts-objectschema';
import {Coding} from './Coding';

@decorators.validate
export class Meta {
    public versionId: ElementDefinition = {
        required: false,
        type: datatypes.Id
    };
    public lastUpdated: ElementDefinition = {
        required: true,
        type: datatypes.Instant
    };
    public profile: ElementDefinition = {
        required: false,
        type: datatypes.Uri
    };
    public security: ElementDefinition = {
        required: false,
        type: [datatypes.Uri]
    };
    public tag: ElementDefinition = {
        required: false,
        type: [Coding]
    };
    public constructor(data: {[key: string]: any}, validate: Enforce) {

        // do nothing

    }
}
