import {Validator, Uri, Id, Instant, ElementDefinition, enforce} from 'ts-objectschema';
import {Coding} from './Coding';

export class Meta extends Validator {
    public versionId: ElementDefinition = {
        required: false,
        type: Id
    };
    public lastUpdated: ElementDefinition = {
        required: true,
        type: Instant
    };
    public profile: ElementDefinition = {
        required: false,
        type: Uri
    };
    public security: ElementDefinition = {
        required: false,
        type: [Uri]
    };
    public tag: ElementDefinition = {
        required: false,
        type: [Coding]
    };
    public constructor(data: {[key: string]: any}, validate: enforce) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
