import {Valueset} from 'ts-objectschema';

export class RestfulConformanceMode {

    public codeSystem: Object = {
        concept: [
            {
                abstract: true,
                code: 'client',
                display: 'string'
            },
            {
                abstract: true,
                code: 'server',
                display: 'string'
            }
        ],
        system: process.env.DOMAIN + '/ValueSet/RestfulConformanceMode',
        version: '1.0.0'
    };

}

export const restfulConformanceMode: Valueset = new Valueset(new RestfulConformanceMode());