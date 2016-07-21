import {SchemaComponent, SchemaModels}      from    '../../lib/schema';
import * as Datatypes                       from    './primeitive';
import {quantityComparator}                 from    '../values/quantity-comparator';

export interface IQuantity {
    value: number;
    comparator: string;
    unit: string;
    system: string;
    code: string;
}

@SchemaComponent
export class Quantity {
    public value: SchemaModels.PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Decimal]
    };
    public comparator: SchemaModels.PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Code],
        values: [quantityComparator]
    };
    public unit: SchemaModels.PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.String]
    };
    public system: SchemaModels.PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Uri]
    };
    public code: SchemaModels.PropertyDefinition = {
        max: 1,
        min: 0,
        types: [Datatypes.Code]
    };
    constructor(data: any, enforce: SchemaModels.Enforce) {

        // do nothing
    }
}


// let instance = new Eks({name: ['fisk', 'fisk2'], active: true}, Enforce.exists);
