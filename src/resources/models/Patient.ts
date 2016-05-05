import {Identifier} from '../dataTypes/Identifier';
import {HumanName} from '../dataTypes/HumanName';
import {Address} from '../dataTypes/Address';
import {DomainResource} from '../DomainResource';
import {ElementDefinition, enforce} from 'ts-objectschema';

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
    public constructor(data: { [key: string]: any }, validate: enforce) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
