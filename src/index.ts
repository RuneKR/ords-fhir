/// <reference path='../typings/main.d.ts' />
import * as express from 'express';

export {Server}     from './lib/server';

export interface Common {
    Router: any
}

export const common: Common = {
    Router: express
};
