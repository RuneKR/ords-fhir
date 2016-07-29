import * as cluster                     from 'cluster';

/*
* Map with number as key and value as a cluster.Worker
*/
export interface SlaveByProcessid {
    [key: number]: cluster.Worker;
}
