import {IMeta}       from    '../datatypes/meta'; 
import {INarrative}  from    '../datatypes/narrative'; 


export interface DomainResource {
    id?: string;
    meta?: IMeta;
    implicitRules?: string;
    language?: string;
    text?: INarrative;
    resource?: Array<DomainResource>;
}
