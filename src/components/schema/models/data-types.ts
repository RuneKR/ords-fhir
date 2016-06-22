/**
 * Every datatype that only supply one _OneValue
 */
export interface OneValue {
    _OneValue: any;
}

// include all the these simple hl7 fhir

export class Boolean implements OneValue {
    public _OneValue: any;
    constructor(data: any) {

        // convert to correct form
        if (data === 'false') {
            data = false;
        } else if (data === 'true') {
            data = true;
        }

        if (data !== false && data !== true) {
            throw new Error('not a boolean');
        }
        this._OneValue = data;
    }
}

export class DateTime implements OneValue {
    public _OneValue: any;
    constructor(data: string) {
        if (!!new Date(data).getTime()) {
            throw new Error('not a dateTime');
        }
        this._OneValue = data;
    }
}

export class Instant implements OneValue {
    public _OneValue: any;
    constructor(data: string) {
        if (!!new Date(data).getTime()) {
            throw new Error('not a dateTime');
        }
        this._OneValue = data;
    }
}

export class String implements OneValue {
    public _OneValue: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._OneValue = data;
    }
}

export class Id implements OneValue {
    public _OneValue: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._OneValue = data;
    }
}

export class Code implements OneValue {
    public _OneValue: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._OneValue = data;
    }
}

export class Uri implements OneValue {
    public _OneValue: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._OneValue = data;
    }
}

export class Number implements OneValue {
    public _OneValue: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._OneValue = data;
    }
}
