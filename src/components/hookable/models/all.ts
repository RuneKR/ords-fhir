import {Next}       from    './next';
import {Promise}    from 'es6-promise';

export interface All<T, U> {
    (args: T): Promise<U>;
    pre?: Array<Next<T, U>>;
    post?: Array<Next<T, U>>;
    actor?: Array<Next<T, U>>;
}
