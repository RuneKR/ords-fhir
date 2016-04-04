import {Valueset} from '../Valueset';

export class NameUse {

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
                code: 'anonymous',
                display: 'string'
            },
            {
                abstract: true,
                code: 'old',
                display: 'string'
            },
            {
                abstract: true,
                code: 'maiden',
                display: 'string'
            }
        ],
        system: 'Our system',
        version: '1'
    };

}

export const nameUse: NameUse = new Valueset(new NameUse());
