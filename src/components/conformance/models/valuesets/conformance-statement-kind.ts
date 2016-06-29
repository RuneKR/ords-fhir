import {ConformanceModels} from '../../components/Conformance';

export class ConformanceStatementKind {

    public codeSystem: Object = {
        concept: [
            {
                abstract: true,
                code: 'instance',
                display: 'string'
            },
            {
                abstract: true,
                code: 'capability',
                display: 'string'
            },
            {
                abstract: true,
                code: 'requirements',
                display: 'string'
            }
        ],
        system: process.env.DOMAIN + '/ValueSet/ConformanceStatementKind',
        version: '1.0.0'
    };

}

export const conformanceStatementKind: ConformanceStatementKind = new ConformanceModels.Valueset(new ConformanceStatementKind());