import {ReturnableNext} from './returnable-next';
import {Promise}        from 'es6-promise';

export interface ReturnableAll<T, U> {
    (args: T): Promise<U>;
    pre?: Array<ReturnableNext<T, U>>;
    post?: Array<ReturnableNext<T, U>>;
    actor?: Array<ReturnableNext<T, U>>;
}
