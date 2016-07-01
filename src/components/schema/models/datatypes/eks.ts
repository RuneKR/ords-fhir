import {PropertyDefinition}     from    '../property-definition';
import * as Datatypes           from    './primeitive';
import {SchemaComponent}        from    '../../schema.component';
import {Enforce}                from    '../enforce';

@SchemaComponent
export class Eks {
    public name: PropertyDefinition = {
        max: 2,
        min: 0,
        types: [Datatypes.String]
    };
    public lastName: PropertyDefinition = {
        max: 1,
        min: 1,
        types: [Datatypes.String]
    };
    constructor(data: any, enforce: Enforce){
        
    }
}


// let instance = new Eks({name: ['fisk', 'fisk2'], active: true}, Enforce.exists);
