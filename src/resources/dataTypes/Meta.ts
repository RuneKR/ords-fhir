import {Validator, Uri, Id, Instant, ElementDefinition, PopulationLevel} from 'ts-objectschema';
import {KeyStringObject} from '../../lib/interfaces';
import {Coding} from './Coding';

export class Meta extends Validator {
    public versionId: ElementDefinition = {
        required: false,
        search: false,
        type: Id
    };
    public lastUpdated: ElementDefinition = {
        required: true,
        search: false,
        type: Instant
    };
    public profile: ElementDefinition = {
        required: false,
        search: false,
        type: Uri
    };
    public security: ElementDefinition = {
        required: false,
        search: false,
        type: [Uri]
    };
    public tag: ElementDefinition = {
        required: false,
        search: false,
        type: [Coding]
    };
    public constructor(data: KeyStringObject, validate: PopulationLevel) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
