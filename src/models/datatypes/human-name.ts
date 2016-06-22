import {nameUse} from '../valuesets/name-use';
import {Period} from './Period';
import {decorators, datatypes, ElementDefinition, Enforce, BindingStrength, Binding} from 'ts-objectschema';

@decorators.validate
export class HumanName {
    public use: ElementDefinition = {
        binding: new Binding(BindingStrength.required, 'Description of valueset', nameUse),
        required: false,
        type: datatypes.String
    };
    public text: ElementDefinition = {
        required: false,
        type: datatypes.String
    };
    public family: ElementDefinition = {
        required: false,
        type: [datatypes.String]
    };
    public given: ElementDefinition = {
        required: false,
        type: [datatypes.String]
    };
    public prefix: ElementDefinition = {
        required: false,
        type: [datatypes.String]
    };
    public period: ElementDefinition = {
        required: false,
        type: Period
    };
    public constructor(data: {[key: string]: any}, validate: Enforce) {

        // do nothing
        
    }
}
