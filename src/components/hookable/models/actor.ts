import {Next}       from    './next';

export interface Actor<T, U> {
    (args: T): void;
    actor?: Array<Next<T, U>>;
}
