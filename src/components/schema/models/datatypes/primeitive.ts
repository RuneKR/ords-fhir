import {Element}        from    '../Element';

// include all the these simple hl7 fhir

export class Any implements Element {
    public _value: any;
    constructor(data: any) {
        
        this._value = data;
    }
}

export class Boolean implements Element {
    public _value: any;
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
        this._value = data;
    }
}

/**
 * Date is reserved so DateFHIR is to be used instead
 */
export class DateFHIR implements Element {
    public _value: any;
    constructor(data: string) {
        if (!!new Date(data).getTime()) {
            throw new Error('not a dateTime');
        }
        this._value = data;
    }
}

export class DateTime implements Element {
    public _value: any;
    constructor(data: string) {
        if (!!new Date(data).getTime()) {
            throw new Error('not a dateTime');
        }
        this._value = data;
    }
}

export class Time implements Element {
    public _value: any;
    constructor(data: string) {
        if (!!new Date(data).getTime()) {
            throw new Error('not a dateTime');
        }
        this._value = data;
    }
}

export class Instant implements Element {
    public _value: any;
    constructor(data: string) {
        if (!!new Date(data).getTime()) {
            throw new Error('not a dateTime');
        }
        this._value = data;
    }
}

export class String implements Element {
    public _value: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._value = data;
    }
}

export class Id implements Element {
    public _value: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._value = data;
    }
}

export class Markdown implements Element {
    public _value: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._value = data;
    }
}

export class Oid implements Element {
    public _value: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._value = data;
    }
}

export class Uri implements Element {
    public _value: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._value = data;
    }
}

export class Decimal implements Element {
    public _value: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._value = data;
    }
}

export class Integer implements Element {
    public _value: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._value = data;
    }
}

export class Base64Binary implements Element {
    public _value: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._value = data;
    }
}

export class Code implements Element {
    public _value: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._value = data;
    }
}

export class PositiveInt implements Element {
    public _value: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._value = data;
    }
}

export class UnsignedInt implements Element {
    public _value: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this._value = data;
    }
}
