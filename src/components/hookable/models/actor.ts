import {Next}       from    './next';

export interface Actor<T> {
    (args: T): void;
    actor?: Array<Next<T>>;
}
