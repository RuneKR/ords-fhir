import {IMeta}       from    '../datatypes/meta'; 

export interface DomainResource {
    id: string;
    uri: string;
    code: string;
    meta: IMeta;
    implicitRules: string;
    language: string;
}
