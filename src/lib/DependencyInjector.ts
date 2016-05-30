/**
 * list of all singletons used in the DependencyInjector
 */
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
    private singleTons: Singletons = {};
    /**
     * Create an instance of target and inject from the listed dependencies
     * @param   {...any}  dependencies  list of dependencies needed to resolved
     * @returns {void}    
     */
    public createWith(...dependencies: Array<any>): Function {

        // return the function specified by ts documentation
        return (target: any) => {

            let args: Array<Function> = [];

            // loop all the dependencies if a singleton allready exsists
            for (let entry of dependencies) {
                
                // generate a new singleton
                if (this.singleTons[entry.name] === undefined) {
                    this.singleTons[entry.name] = new entry();
                }

                // set the value of target to the required singleton      
                args.push(this.singleTons[entry.name]);
            }
            
            // preapre this argument
            let instance: any = Object.create(target.prototype);

            // call target and save reference as singleton
            target.apply(instance, args);
            this.singleTons[target.name] = instance;
        };
    }
    /**
     * Inject a singleton into a property 
     * @param   {any}       dependency  list of dependencies needed to resolve
     * @returns {Function}  declaration for a property function
     */
    public inject(dependency: any): Function {

        // return the function specified by ts documentation
        return (target: any, propertyKey: string | symbol) => {

            // if singleton do not exsists create a new one
            if (this.singleTons[dependency.name] === undefined) {
                this.singleTons[dependency.name] = new dependency();
            }

            // set the value of target to the required singleton      
            target[propertyKey] = this.singleTons[dependency.name];
        };
    }
}

/**
 * Singleton for managing injections
 */
export const DI: DependencyInjector = new DependencyInjector();
