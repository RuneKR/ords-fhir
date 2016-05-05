import {nameUse} from '../valueSets/NameUse';
import {Period} from './Period';
import {String, Validator, ElementDefinition, enforce, BindingStrength, Binding} from 'ts-objectschema';

export class HumanName extends Validator {
    public use: ElementDefinition = {
        binding: new Binding(BindingStrength.required, 'Description of valueset', nameUse),
        required: false,
        type: String
    };
    public text: ElementDefinition = {
        required: false,
        type: String
    };
    public family: ElementDefinition = {
        required: false,
        type: [String]
    };
    public given: ElementDefinition = {
        required: false,
        type: [String]
    };
    public prefix: ElementDefinition = {
        required: false,
        type: [String]
    };
    public period: ElementDefinition = {
        required: false,
        type: Period
    };
    public constructor(data: {[key: string]: any}, validate: enforce) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
