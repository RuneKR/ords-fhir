import {Resource}       from    './resource';

export interface RecordRemoval {
    query: {
        [key: string]: any;
    };
    resource: Resource;
}
