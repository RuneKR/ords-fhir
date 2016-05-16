import {Valueset} from 'ts-objectschema';

export class MimeType {

    public codeSystem: Object = {
        concept: [
            {
                abstract: true,
                code: 'xml',
                display: 'string'
            },
            {
                abstract: true,
                code: 'json',
                display: 'string'
            },
            {
                abstract: true,
                code: 'mime type',
                display: 'string'
            }
        ],
        system: process.env.DOMAIN + '/ValueSet/MimeType',
        version: '1.0.0'
    };

}

export const mimeType: Valueset = new Valueset(new MimeType());