/**
 * list of all singletons used in the DependencyInjector
 */
export interface Singletons {
    [key: string]: any;
}
/**
 * Manage singletons for all dependencies
 * @class DependencyInjector
 */
export declare class DependencyInjector {
    /**
     * Contains all initiated singletons
     */
    private singletons;
    /**
     * Create an instance of target and inject from the listed dependencies
     * @param   {...any}  dependencies  list of dependencies needed to resolved
     * @returns {void}
     */
    createWith(...dependencies: Array<any>): Function;
    /**
     * Inject a singleton into a property of a class
     * @param   {any}       dependency  list of dependencies needed to resolve
     * @returns {Function}  declaration for a property function
     */
    inject(dependency: any): Function;
}
/**
 * Singleton for managing injections
 */
export declare const CoreComponent: DependencyInjector;
