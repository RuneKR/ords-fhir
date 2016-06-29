import {ConformanceModels} from '../../components/Conformance';

export class BoundleType {
    public codeSystem: Object = {
        concept: [
            {
                abstract: true,
                code: 'home',
                display: 'string'
            },
            {
                abstract: true,
                code: 'work',
                display: 'string'
            },
            {
                abstract: true,
                code: 'temp',
                display: 'string'
            },
            {
                abstract: true,
                code: 'old',
                display: 'string'
            },
        ],
        system: process.env.domain + '/ValueSet/AddressUse',
        version: '1.0.0'
    };
}

export const boundleType: BoundleType = new ConformanceModels.Valueset(new BoundleType());
