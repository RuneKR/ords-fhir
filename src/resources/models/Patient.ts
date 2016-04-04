import {Identifier} from '../dataTypes/Identifier';
import {HumanName} from '../dataTypes/HumanName';
import {Address} from '../dataTypes/Address';
import {DomainResource} from '../DomainResource';
import {ElementDefinition, PopulationLevel} from 'ts-objectschema';
import {KeyStringObject} from '../../lib/interfaces';

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
    public constructor(data: KeyStringObject, validate: PopulationLevel) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
