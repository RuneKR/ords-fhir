import {PropertyDefinition}         from    '../property-definition';
import * as Datatypes               from    './primeitive';
import {SchemaComponent}            from    '../../schema.component';
import {Enforce}                    from    '../enforce';
import {quantityComparator}         from    '../values/quantity-comparator';

export interface IQuantity {
    value: number;
    comparator: string;
    unit: string;
    system: string;
    code: string;
}

@SchemaComponent
export class Quantity {
    public value: PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Decimal]
    };
    public comparator: PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Code],
        values: [quantityComparator]
    };
    public unit: PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.String]
    };
    public system: PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Uri]
    };
    public code: PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Code]
    };
    constructor(data: any, enforce: Enforce) {

        // do nothing
    }
}


// let instance = new Eks({name: ['fisk', 'fisk2'], active: true}, Enforce.exists);
