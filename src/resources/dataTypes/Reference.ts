import {addressUse} from '../valueSets/AddressUse';
import {datatypes, decorators, ElementDefinition, Binding, BindingStrength, Enforce} from 'ts-objectschema';

@decorators.validate
export class Reference {
    public reference: ElementDefinition = {
        required: false,
        type: datatypes.String
    };
    // fortsæt herfra!!!
    public display: ElementDefinition = {
        required: false,
        type: datatypes.String
    };

    public constructor(data: {[key: string]: any}, validate: Enforce) {

        // do nothing

    }
}

export interface IReference {
    
}
