import {Identifier}     from '../datatypes/identifier';
import {HumanName}      from '../datatypes/human-name';
import {Address}        from '../dataTypes/address';
import {DomainResource} from './domain-resource';
import {SchemaModels}   from '../../../schema';
import * as DataTypes   from '../datatypes/primitives'; 

export class Patient extends DomainResource {

    public identifier: SchemaModels.ElementDefinition = {
        required: false,
        type: Identifier
    };

    public active: SchemaModels.ElementDefinition = {
        required: false,
        type: DataTypes.Boolean
    };
    public name: SchemaModels.ElementDefinition = {
        required: true,
        type: HumanName
    };
    public address: SchemaModels.ElementDefinition = {
        required: true,
        type: Address
    };
    public constructor(data: any, validate: SchemaModels.Enforce) {

        // do validation command
        super();

    }
}
