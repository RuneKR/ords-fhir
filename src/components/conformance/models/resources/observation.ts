import {DomainResource}     from './domain-resource';
import {CodeableConcept}    from '../datatypes/codeable-concept';
import {SchemaModels}       from '../../../schema';
import {Identifier}         from '../datatypes/identifier';
import * as DataTypes       from '../datatypes/primitives'; 

export class Observation extends DomainResource {

    public identifier: SchemaModels.ElementDefinition = {
        required: false,
        type: Identifier
    };

    public status: SchemaModels.ElementDefinition = {
        required: true,
        type: DataTypes.String
    };

    public category: SchemaModels.ElementDefinition = {
        required: false,
        type: CodeableConcept
    };
    public constructor(data: SchemaModels.Valueset, validate: SchemaModels.Enforce) {

        // do validation command
        super();
    }
}
