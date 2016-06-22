import {DomainResource}     from './domain-resource';
import {CodeableConcept}    from '../datatypes/codeable-concept';
import {SchemaModels}       from '../../components/schema';
import {Identifier}         from '../datatypes/identifier';

export class Observation extends DomainResource {

    public identifier: SchemaModels.ElementDefinition = {
        required: false,
        type: Identifier
    };

    public status: SchemaModels.ElementDefinition = {
        required: true,
        type: String
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
