/**
 * list of all singletons used in the DependencyInjector
 */
export interface Singletons {
    [key: string]: any;             // hate this notation any better ideas?
}

/**
 * Manage singletons for all dependencies
 * @class DependencyInjector
 */
export class DependencyInjector {
    /**
     * Contains all initiated singletons
     */
    private singletons: Singletons = {};
    /**
     * Create an instance of target and inject from the listed dependencies
     * @param   {...any}  dependencies  list of dependencies needed to resolved
     * @returns {void}    
     */
    public createWith(...dependencies: Array<any>): Function {

        // return the function specified by ts documentation
        return (target: any) => {

            // preapre this argument
            let instance: any = Object.create(target.prototype);

            let args: Array<Function> = [];

            // loop all the dependencies if a singleton allready exsists
            for (let entry of dependencies) {

                // generate a new singleton
                if (this.singletons[entry] === undefined) {

                    this.singletons[entry] = new entry();
                }

                // set the value of target to the required singleton      
                args.push(this.singletons[entry]);
            }

            // call target and save reference as singleton
            target.apply(instance, args);
            this.singletons[target] = instance;
        };
    }
   /**
    * Inject a singleton into a property of a class
    * @param   {any}       dependency  list of dependencies needed to resolve
    * @returns {Function}  declaration for a property function
    */
    public inject(dependency: any): Function {

        // return the function specified by ts documentation
        return (target: any, propertyKey: string | symbol) => {


            // if singleton do not exsists create a new one
            if (this.singletons[dependency] === undefined) {
                this.singletons[dependency] = new dependency();
            }

            // set the value of target to the required singleton      
            target[propertyKey] = this.singletons[dependency];
        };
    }
}

/**
 * Singleton for managing injections
 */
export const DI: DependencyInjector = new DependencyInjector();
