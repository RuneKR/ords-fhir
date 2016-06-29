import {Valueset} from '../resources/Valueset';

export class UnknownContentCode {

    public codeSystem: Object = {
        concept: [
            {
                abstract: true,
                code: 'no',
                display: 'string'
            },
            {
                abstract: true,
                code: 'extentions',
                display: 'string'
            },
            {
                abstract: true,
                code: 'elements',
                display: 'string'
            },
            {
                abstract: true,
                code: 'both',
                display: 'string'
            }
        ],
        system: process.env.DOMAIN + '/ValueSet/UnknownContentCode',
        version: '1.0.0'
    };

}

export const unknownContentCode: Valueset = new Valueset(new UnknownContentCode());