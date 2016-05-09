/// <reference path='../typings/main.d.ts' />
import * as express                 from 'express';
import {DependencyInjector}         from './lib/DependencyInjector';
import {HookManager}                from './lib/HookManager';
import {DBManager}                  from './lib/DBManager';

export {Server}                     from './lib/server';
export {DI}                         from './lib/DependencyInjector';

export interface Common {
    DBManager: DBManager;
    DependencyInjector: DependencyInjector;
    HookManager: HookManager;
}

export const common: any = {
    DBManager: DBManager,
    DependencyInjector: DependencyInjector,
    HookManager: HookManager,
    Router: express
};
