import {Next}       from    './next';

export interface All<T, U> {
    (args: T): void;
    pre?: Array<Next<T, U>>;
    post?: Array<Next<T, U>>;
    actor?: Array<Next<T, U>>;
}
