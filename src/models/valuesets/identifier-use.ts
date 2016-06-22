import {Valueset} from 'ts-objectschema';

export class IdentifierUse {

    public codeSystem: Object = {
        concept: [
            {
                abstract: true,
                code: 'usual',
                display: 'string'
            },
            {
                abstract: true,
                code: 'official',
                display: 'string'
            },
            {
                abstract: true,
                code: 'temp',
                display: 'string'
            },
            {
                abstract: true,
                code: 'secondary',
                display: 'string'
            }
        ],
        system: process.env.domain + '/ValueSet/IdentifierUse',
        version: '1.0.0'
    };
}

export const identifierUse: IdentifierUse = new Valueset(new IdentifierUse());
