import * as express from 'express';

// get functionname based on a function
let functionName: Function = function (fun: Function): string {

    let ret: string = fun.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
};

export interface Singletons {
    [key: string]: any;             // hate this notation any better ideas?
}

/**
 * Manage injections of singletons into modules
 * @class DependencyInjector
 */
export class DependencyInjector {
    /**
     * Contains all initiated singletons
     */
    public singleTons: Singletons = {};
    /**
     * Get injectors from the listed dependencies
     * @param   {...any}  dependencies  list of dependencies needed to resolve
     * @returns {Function}       declaration for propertie function
     */
    public inject(...dependencies: Array<any>): Function {

        // return the function specified by ts documentation
        return (target: any) => {

            let name: string;
            let propName: string;

            // loop all the dependencies if a singleton allready exsists
            for (let entry of dependencies) {

                // express should be called Router they name it funny
                if (entry === express) {

                    // set name ass router
                    name = 'Router';

                } else {

                    // grap funciton name
                    name = functionName(entry);
                }

                // generate a new singleton
                if (this.singleTons[name] === undefined) {
                    this.singleTons[name] = new entry();
                }

                // get name that are to be set in the target prototype
                propName = name.charAt(0).toLowerCase() + name.slice(1);

                // set the value of target to the required singleton      
                target.prototype[propName] = this.singleTons[name];
            }
        };
    }
    /**
     * Inject a singleton into a property 
     * @param   {any}       dependency  list of dependencies needed to resolve
     * @returns {Function}  declaration for a property function
     */
    public injectProperty(dependency: any): Function {

        // return the function specified by ts documentation
        return (target: any, propertyKey: string | symbol) => {

            let name: string;

            // express should be called Router they name it funny
            if (dependency === express) {

                // set name ass router
                name = 'Router';

            } else {

                // grap funciton name
                name = functionName(dependency);
            }

            // if singleton do not exsists create a new one
            if (this.singleTons[name] === undefined) {
                this.singleTons[name] = new dependency();
            }

            // set the value of target to the required singleton      
            target[propertyKey] = this.singleTons[name];
        };
    }
}

/**
 * Singleton for managing injections
 */
export const DI: DependencyInjector = new DependencyInjector();
