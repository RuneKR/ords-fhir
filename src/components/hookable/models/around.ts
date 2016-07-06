import {Next}       from    './next';
import {Promise}    from 'es6-promise';

export interface Aroud<T, U> {
    (args: T, actor: Next<T, U>): Promise<U>;
    pre?: Array<Next<T, U>>;
    post?: Array<Next<T, U>>;
}
