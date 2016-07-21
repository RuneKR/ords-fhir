import {IMeta}       from    './meta'; 
import {INarrative}  from    './narrative'; 

export interface DomainResource {
    id?: string;
    meta?: IMeta;
    implicitRules?: string;
    language?: string;
    text?: INarrative;
    resource?: Array<DomainResource>;
}
