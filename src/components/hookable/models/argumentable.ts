import {ArgumentableNext}   from './argumentable-next';
import {ArgumentableCb}     from './argumentable-cb';

export interface Argumentable<T, U> extends ArgumentableCb {
    pre?: Array<ArgumentableNext<T, U>>;
    post?: Array<ArgumentableNext<T, U>>;
    actor?: Array<ArgumentableNext<T, U>>;
}
