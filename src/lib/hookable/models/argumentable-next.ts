import {ArgumentableCb}   from './argumentable-cb';

export interface ArgumentableNext<T, U> {
 (args: T, res: U, next: ArgumentableCb): void;
}
