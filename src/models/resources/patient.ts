import {Identifier} from '../datatypes/identifier';
import {HumanName} from '../datatypes/human-name';
import {Address} from '../dataTypes/address';
import {DomainResource} from './domain-resource';
import {SchemaModels}       from '../../components/schema';

export class Patient extends DomainResource {

    public identifier: SchemaModels.ElementDefinition = {
        required: false,
        type: Identifier
    };

    public active: SchemaModels.ElementDefinition = {
        required: false,
        type: Boolean
    };
    public name: SchemaModels.ElementDefinition = {
        required: true,
        type: HumanName
    };
    public address: SchemaModels.ElementDefinition = {
        required: true,
        type: Address
    };
    public constructor(data: SchemaModels.Valueset, validate: SchemaModels.Enforce) {

        // do validation command
        super();

    }
}
