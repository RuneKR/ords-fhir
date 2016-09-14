import {Query}          from    './query';

export interface QueryBase {
    query: Query;
    limit: number;
    skip: number;
}
