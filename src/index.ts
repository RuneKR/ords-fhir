/// <reference path='../typings/main.d.ts' />
import {Router}     from './lib/Router';
import * as express from 'express';

export {Server}     from './lib/server';

export interface Common {
    Router: express.Express;
}

export const common: Common = {
    Router: Router
};
