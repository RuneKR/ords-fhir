import {nameUse} from '../valueSets/NameUse';
import {Period} from './Period';
import {String, Validator, ElementDefinition, PopulationLevel, BindingStrength, Binding} from 'ts-objectschema';
import {KeyStringObject} from '../../lib/interfaces';

export class HumanName extends Validator {
    public use: ElementDefinition = {
        binding: new Binding(BindingStrength.required, 'Description of valueset', nameUse),
        required: false,
        search: false,
        type: String
    };
    public text: ElementDefinition = {
        required: false,
        search: false,
        type: String
    };
    public family: ElementDefinition = {
        required: false,
        search: false,
        type: [String]
    };
    public given: ElementDefinition = {
        required: false,
        search: false,
        type: [String]
    };
    public prefix: ElementDefinition = {
        required: false,
        search: false,
        type: [String]
    };
    public period: ElementDefinition = {
        required: false,
        search: false,
        type: Period
    };
    public constructor(data: KeyStringObject, validate: PopulationLevel) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
