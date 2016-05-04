import {hm, HookManager}      from './HookManager';
import {dbm, DBManager}       from './DBManager';
import * as express           from 'express';

/**
 * Used for managin injections
 * @class DenpendenyInjector
 */
export class DenpendenyInjector {
    [key: string]: any;             // hate this notation any better ideas?
    /**
     * Instance of HookManager
     */
    public hm: HookManager = hm;
    /**
     * Instance of DBManager
     */
    public dbm: DBManager = dbm;  
    /**
     * Main express router
     */
    public router: express.Express = express();
    /**
     * 
     */
    public getInjects(denpendencies: Array<string>): Array<any> {

        let resolve: Array<any> = [];

        for (let entry of denpendencies) {

            if (this[entry] === undefined) {
                throw new Error('Injector do not provide ' + entry);
            }

            resolve.push(this[entry]);
        }

        return resolve;
    }
}

export const DI: DenpendenyInjector = new DenpendenyInjector();
