import {Next}       from    './next';
import {Promise}    from 'es6-promise';

export interface Actor<T, U> {
    (args: T): Promise<U>;
    actor?: Array<Next<T, U>>;
}
