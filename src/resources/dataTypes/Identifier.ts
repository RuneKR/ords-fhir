import {identifierUse} from '../valueSets/IdentifierUse';
import {Period} from './Period';
import {Reference} from './Reference';
import {ElementDefinition, decorators, datatypes, Enforce, BindingStrength, Binding} from 'ts-objectschema';
import {CodeableConcept} from './CodeableConcept';

@decorators.validate
export class Identifier {
    public use: ElementDefinition = {
        binding: new Binding(BindingStrength.required, 'Description of valueset', identifierUse),
        required: false,
        type: datatypes.String
    };
    public type: ElementDefinition = {
        binding: new Binding(BindingStrength.extensible, 'Description of valueset', identifierUse),
        required: false,
        type: CodeableConcept
    };
    public system: ElementDefinition = {
        required: false,
        type: datatypes.Uri
    };
    public value: ElementDefinition = {
        required: false,
        type: [datatypes.String]
    };
    public period: ElementDefinition = {
        required: false,
        type: Period
    };
    public assigner: ElementDefinition = {
        required: false,
        type: Reference
    };

    public constructor(data: {[key: string]: any}, validate: Enforce) {

        // do nothing

    }
}
