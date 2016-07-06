import * as Datatypes                       from    './primeitive';
import {SchemaComponent, SchemaModels}      from    '../../../schema';

export interface INarrative {
    status: string;
    div: string;
}

@SchemaComponent
export class Narrative {
    // build
    constructor(data: any, enforce: SchemaModels.Enforce) {

        // do nothing
    }
}
