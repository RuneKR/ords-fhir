import {addressUse} from '../valueSets/AddressUse';
import {String, Validator, ElementDefinition, Binding, BindingStrength, PopulationLevel} from 'ts-objectschema';

export class Address extends Validator {
    public use: ElementDefinition = {
        binding: new Binding(BindingStrength.required, 'Description of valueset', addressUse),
        required: false,
        search: false,
        type: String
    };
    // fortsæt herfra!!!
    public text: ElementDefinition = {
        required: false,
        search: false,
        type: String
    };

    public constructor(data: {[key: string]: any}, validate: PopulationLevel) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
