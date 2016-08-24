import {Resource}       from    './resource';
import {Query}          from    './query';

export interface DataManipulation {
    query: Query;
    data: any;
    resource: Resource;
}
