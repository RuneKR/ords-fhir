import {Comparator}             from './comparator';

export interface RuleEntry {
    datakey: string;
    comparator: Comparator;
    source: string;
    sourcekey: string;
}
