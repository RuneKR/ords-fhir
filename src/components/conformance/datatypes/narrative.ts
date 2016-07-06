import {PropertyDefinition}         from    '../property-definition';
import * as Datatypes               from    './primeitive';
import {SchemaComponent}            from    '../../schema.component';
import {Enforce}                    from    '../enforce';

export interface INarrative {
    status: string;
    div: string;
}

@SchemaComponent
export class Narrative {
    // build
    constructor(data: any, enforce: Enforce) {

        // do nothing
    }
}
