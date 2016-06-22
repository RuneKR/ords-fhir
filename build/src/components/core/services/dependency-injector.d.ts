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
    singletons: Singletons;
    /**
     * Get a list of singletons from the dependencies
     * @param   {...any}  dependencies  list of dependencies needed to resolved
     * @returns {Array<any>}            list of singletons
     */
    getSingletons(dependencies: Array<any>): Array<any>;
    /**
     * Get a single singleton
     * @param   {any}       dependency  the dependency that is needed as a singleton
     * @returns {any}       return the found singleton
     */
    getSingleton(dependency: any): any;
}
/**
 * Singleton for managing injections
 */
export declare const DI: DependencyInjector;
