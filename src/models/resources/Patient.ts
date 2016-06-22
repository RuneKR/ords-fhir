import {Identifier} from '../datatypes/identifier';
import {HumanName} from '../datatypes/human-name';
import {Address} from '../dataTypes/Address';
import {DomainResource} from './domain-resource';
import {ElementDefinition, Enforce} from 'ts-objectschema';

export class Patient extends DomainResource {

    public identifier: ElementDefinition = {
        required: false,
        type: Identifier
    };

    public active: ElementDefinition = {
        required: false,
        type: Boolean
    };
    public name: ElementDefinition = {
        required: true,
        type: HumanName
    };
    public address: ElementDefinition = {
        required: true,
        type: Address
    };
    public constructor(data: { [key: string]: any }, validate: Enforce) {

        // do validation command
        super();

    }
}
