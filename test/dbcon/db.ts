import {data} from './patientdata';

/**
 * Demo in memmory database
 */
export class DB {
    [key: string]: any;
    public Patient: Array<any> = data;
}

export const instance: DB = new DB();