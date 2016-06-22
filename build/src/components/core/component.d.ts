/**
 * Create an instance of target and inject from the listed dependencies
 * @param   {...any}  dependencies  list of dependencies needed to resolved
 * @returns {void}
 */
export declare function CreateWith(...dependencies: Array<any>): Function;
/**
 * Inject a singleton into a property of a class
 * @param   {any}       dependency  list of dependencies needed to resolve
 * @returns {Function}  declaration for a property function
 */
export declare function Inject(dependency: any): Function;
