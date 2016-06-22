/**
 * Every datatype that only supply one _OneValue
 */
export interface OneValue {
    _OneValue: any;
}
export declare class Boolean implements OneValue {
    _OneValue: any;
    constructor(data: any);
}
export declare class DateTime implements OneValue {
    _OneValue: any;
    constructor(data: string);
}
export declare class Instant implements OneValue {
    _OneValue: any;
    constructor(data: string);
}
export declare class String implements OneValue {
    _OneValue: any;
    constructor(data: string);
}
export declare class Id implements OneValue {
    _OneValue: any;
    constructor(data: string);
}
export declare class Code implements OneValue {
    _OneValue: any;
    constructor(data: string);
}
export declare class Uri implements OneValue {
    _OneValue: any;
    constructor(data: string);
}
export declare class Number implements OneValue {
    _OneValue: any;
    constructor(data: string);
}
