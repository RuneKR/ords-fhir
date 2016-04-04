import {Valueset} from '../Valueset';

export class AddressUse {
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
        system: 'Our system',
        version: '1'
    };
}

export const addressUse: AddressUse = new Valueset(new AddressUse());