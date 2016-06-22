import {datatypes, decorators, ElementDefinition, Enforce} from 'ts-objectschema';
import {Coding} from './Coding';

@decorators.validate
export class CodeableConcept {
    public coding: ElementDefinition = {
        required: false,
        type: [Coding]
    };
    public text: ElementDefinition = {
        required: false,
        type: datatypes.String
    };
    public constructor(data: {[key: string]: any}, validate: Enforce) {

        // do nothing

    }
}
