import "./typings/main.d.ts";       // to typings work on external modules

export {Server}                     from './lib/server';
export {DI, DependencyInjector}     from './lib/DependencyInjector';
export {HookManager}                from './lib/HookManager';
export {DBManager}                  from './lib/DBManager';
export {Requestparser}              from './lib/Requestparser';
export {Router}                     from 'express';
