import {Valueset} from 'ts-objectschema';

export class ConformanceResourceStatus {

    public codeSystem: Object = {
        concept: [
            {
                abstract: true,
                code: 'draft',
                display: 'string'
            },
            {
                abstract: true,
                code: 'active',
                display: 'string'
            },
            {
                abstract: true,
                code: 'retired',
                display: 'string'
            }
        ],
        system: process.env.domain + '/ValueSet/ConformanceResourceStatus',
        version: '1.0.0'
    };

}

export const conformanceResourceStatus: Valueset = new Valueset(new ConformanceResourceStatus());
