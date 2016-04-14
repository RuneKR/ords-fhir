import {identifierUse} from '../valueSets/IdentifierUse';
import {Period} from './Period';
import {Reference} from './Reference';
import {String, Validator, Uri, ElementDefinition, PopulationLevel, BindingStrength, Binding} from 'ts-objectschema';
import {CodeableConcept} from './CodeableConcept';

export class Identifier extends Validator {
    public use: ElementDefinition = {
        binding: new Binding(BindingStrength.required, 'Description of valueset', identifierUse),
        required: false,
        search: false,
        type: String
    };
    public type: ElementDefinition = {
        binding: new Binding(BindingStrength.extensible, 'Description of valueset', identifierUse),
        required: false,
        search: false,
        type: CodeableConcept
    };
    public system: ElementDefinition = {
        required: false,
        search: false,
        type: Uri
    };
    public value: ElementDefinition = {
        required: false,
        search: false,
        type: [String]
    };
    public period: ElementDefinition = {
        required: false,
        search: false,
        type: Period
    };
    public assigner: ElementDefinition = {
        required: false,
        search: false,
        type: Reference
    };

    public constructor(data: {[key: string]: any}, validate: PopulationLevel) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
