import {hm, HookManager}      from './HookManager';
import {dbm, DBManager}       from './DBManager';
import * as express           from 'express';

/**
 * Manage injections
 * @class DenpendenyInjector
 */
export class DenpendenyInjector {
    [key: string]: any;             // hate this notation any better ideas?
    /**
     * Instance of HookManager
     * @type {HookManager}
     */
    public hm: HookManager = hm;
    /**
     * Instance of DBManager
     * @type {DBManager}
     */
    public dbm: DBManager = dbm;  
    /**
     * Main express router
     */
    public router: express.Express = express();
    /**
     * Get injectors from the listed denpendencies
     * @param   {Array<string>}  denpendencies  list of dependencies needed to resolve
     * @returns {Array<any>}     array of dependencies
     * @throws  Error is thrown if dependcy does not exsists 
     */
    public getInjects(denpendencies: Array<string>): Array<any> {

        // temp holder for resolved dependencies
        let resolve: Array<any> = [];

        // loop all the dependencies
        for (let entry of denpendencies) {

            // if they do not exsists then supply error
            if (this[entry] === undefined) {
                throw new Error('Injector do not provide ' + entry);
            }

            // save ref to dependency
            resolve.push(this[entry]);
        }
        
        // return results
        return resolve;
    }
}

/**
 * Singleton for managing injections
 */
export const DI: DenpendenyInjector = new DenpendenyInjector();
