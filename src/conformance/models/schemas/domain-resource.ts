import {IMeta}       from    './meta'; 
import {INarrative}  from    './narrative'; 

export interface IDomainResource {
    id?: string;
    meta?: IMeta;
    implicitRules?: string;
    language?: string;
    text?: INarrative;
}
