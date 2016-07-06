import {Next}       from    './next';

export interface All<T> {
    (args: T): void;
    pre?: Array<Next<T>>;
    post?: Array<Next<T>>;
    actor?: Array<Next<T>>;
}
