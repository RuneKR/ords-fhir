import {addressUse} from '../valuesets/address-use';
import {datatypes, decorators, ElementDefinition, Binding, BindingStrength, Enforce} from 'ts-objectschema';

@decorators.validate
export class Address {
    public use: ElementDefinition = {
        binding: new Binding(BindingStrength.required, 'Description of valueset', addressUse),
        required: false,
        type: datatypes.String
    };
    // fortsæt herfra!!!
    public text: ElementDefinition = {
        required: false,
        type: datatypes.String
    };

    public constructor(data: {[key: string]: any}, validate: Enforce) {

        // do nothing

    }
}
