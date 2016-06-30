import {Enforce}        from './enforce';

export interface Schema extends Function {
    new (data: any, enforce?: Enforce): any;
}
