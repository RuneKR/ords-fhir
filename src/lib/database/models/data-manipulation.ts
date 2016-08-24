import {Resource}       from    './resource';

export interface DataManipulation {
    query: {
        [key: string]: any;
    };
    data: any;
    resource: Resource;
}
