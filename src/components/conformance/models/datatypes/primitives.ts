import {SchemaModels}        from    '../../../schema';

// include all the these simple hl7 fhir

export class Any implements SchemaModels.Element {
    public value: any;
    constructor(data: any) {
        
        this.value = data;
    }
}

export class Boolean implements SchemaModels.Element {
    public value: any;
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
        this.value = data;
    }
}

export class DateTime implements SchemaModels.Element {
    public value: any;
    constructor(data: string) {
        if (!!new Date(data).getTime()) {
            throw new Error('not a dateTime');
        }
        this.value = data;
    }
}

export class Instant implements SchemaModels.Element {
    public value: any;
    constructor(data: string) {
        if (!!new Date(data).getTime()) {
            throw new Error('not a dateTime');
        }
        this.value = data;
    }
}

export class String implements SchemaModels.Element {
    public value: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this.value = data;
    }
}

export class Id implements SchemaModels.Element {
    public value: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this.value = data;
    }
}

export class Code implements SchemaModels.Element {
    public value: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this.value = data;
    }
}

export class Uri implements SchemaModels.Element {
    public value: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this.value = data;
    }
}

export class Number implements SchemaModels.Element {
    public value: any;
    constructor(data: string) {
        if (data.toString() !== data) {
            throw new Error('not a string');
        }
        this.value = data;
    }
}
