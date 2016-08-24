import {Resource}       from    './resource';

export interface QueryBase {
    query: {
        [key: string]: any;
    };
    limit: number;
    skip: number;
    resource: Resource;
}
