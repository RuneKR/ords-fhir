import {ArgumentableNext}   from './argumentable-next';
import {Promise}            from 'es6-promise';

export interface Argumentable<T, U> {
    (args: T, res: U): Promise<U>;
    pre?: Array<ArgumentableNext<T, U>>;
    post?: Array<ArgumentableNext<T, U>>;
    actor?: Array<ArgumentableNext<T, U>>;
}
