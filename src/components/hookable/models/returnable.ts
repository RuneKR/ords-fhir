import {ReturnableNext} from './returnable-next';
import {Promise}        from 'es6-promise';

export interface Returnable<T, U> {
    (args: T): Promise<U>;
    actor?: Array<ReturnableNext<T, U>>;
}
