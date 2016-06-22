import {ConformanceModels} from '../../components/Conformance';

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

export const restfulConformanceMode: ConformanceModels.Valueset = new ConformanceModels.Valueset(new RestfulConformanceMode());