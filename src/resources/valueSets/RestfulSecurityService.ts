import {Valueset} from 'ts-objectschema';

export class RestfulSecurityService {

    public codeSystem: Object = {
        concept: [
            {
                abstract: true,
                code: 'OAuth',
                display: 'string'
            },
            {
                abstract: true,
                code: 'SMART-on-FHIR',
                display: 'string'
            },
            {
                abstract: true,
                code: 'NTLM',
                display: 'string'
            },
            {
                abstract: true,
                code: 'Basic',
                display: 'string'
            },
            {
                abstract: true,
                code: 'Kerberos',
                display: 'string'
            },
            {
                abstract: true,
                code: 'Certificates',
                display: 'string'
            }
        ],
        system: process.env.DOMAIN + '/ValueSet/RestfulSecurityService',
        version: '1.0.0'
    };

}

export const restfulSecurityService: Valueset = new Valueset(new RestfulSecurityService());