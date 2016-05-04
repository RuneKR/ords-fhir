import {Identifier} from '../dataTypes/Identifier';
import {HumanName} from '../dataTypes/HumanName';
import {Address} from '../dataTypes/Address';
import {DomainResource} from '../DomainResource';
import {ElementDefinition, enforce} from 'ts-objectschema';

export class Patient extends DomainResource {

    public identifier: ElementDefinition = {
        required: false,
        search: true,
        type: Identifier
    };

    public active: ElementDefinition = {
        required: false,
        search: true,
        type: Boolean
    };
    public name: ElementDefinition = {
        required: true,
        search: true,
        type: HumanName
    };
    public address: ElementDefinition = {
        required: true,
        search: true,
        type: Address
    };
    public constructor(data: { [key: string]: any }, validate: enforce) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
