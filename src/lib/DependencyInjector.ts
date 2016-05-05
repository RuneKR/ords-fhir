// get functionname based on a function
let functionName: Function = function (fun: Function): string {

    let ret: string = fun.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
};

/**
 * Manage injections for external modules
 * @class DependencyInjector
 */
export class DependencyInjector {
    [key: string]: any;             // hate this notation any better ideas?
    /**
     * Get injectors from the listed dependencies
     * @param   {Array<string>}  dependencies  list of dependencies needed to resolve
     * @returns {Function}       declaration for propertie function
     */
    public injectSingleton(...dependencies: Array<any>): Function {

        // return the function specified by ts documentation
        return (target: any, propertyKey: string | symbol) => {

            let name: string;
            
            // loop all the dependencies if a singleton allready exsists
            for (let entry of dependencies) {
                
                name = functionName(entry);
                
                if (this[name] === undefined) {
                    this[name] = new entry();
                }

                // set the value of target to the required singleton      
                target[propertyKey] = this[name];
            }
        };
    }
    /**
     * Bootstrap all supplied elements to singletons and supply no paramters to them
     * @param   {Array<class>}    elements    elemets to initiated as singletons
     * @returns {Void}
     */
    public bootstrap(elements: Array<any>): void {

        // loop all the elements
        for (let entry of elements) {
            this[functionName(entry)] = new entry();
        }
    }
    /**
     * Get injectors from the listed dependencies
     * @param   {Array<string>}  dependencies  list of dependencies needed to resolve
     * @returns {Array<any>}     array of dependencies
     * @throws  Error is thrown if dependcy does not exsists 
     */
    public getInjects(dependencies: Array<string>): Array<any> {

        // temp holder for resolved dependencies
        let resolve: Array<any> = [];

        // loop all the dependencies
        for (let entry of dependencies) {

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
    /**
     * Get injectors from the listed dependencies
     * @param   {Array<string>}  dependencies  list of dependencies needed to resolve
     * @returns {Array<any>}     array of dependencies
     * @throws  Error is thrown if dependcy does not exsists 
     */
    public injectTo(target: any, name: string, dependencies: Array<any>): Array<any> {

        // create tmp scope
        let scope: any = Object.create(target.prototype);

        // check if DI includes a module instance allready
        if (this[name] !== undefined) {
            throw new Error('Module allready exsits by name ' + name);
        }

        // create new instance of the dependency and keep reference to it
        this[name] = target.apply(scope, dependencies);

        return [];
    }
}

/**
 * Singleton for managing injections
 */
export const DI: DependencyInjector = new DependencyInjector();
