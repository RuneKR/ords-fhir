export interface StringMapFunction {
    [key: string]: {
        [key: string]: Function;
    };
}

/**
 * Hook manager and container for commands executed within the application
 * @class Hook
 */
export class Hook {
    /**
     * Container of all hooks related to their commands
     * @type {StringMapFunction}
     */
    public hooks: StringMapFunction;
    /**
     * Creates a new empty container for commands and their hooks
     */
    constructor() {

        // initiating empty object for hooks
        this.hooks = {};
    }
    /**
     * Add a named hook to a speicific command or create a new command and add the hook to that command
     * @param   {string}      command   command to be hooked into
     * @param   {string}      name      name of the hook being added
     * @param   {Function}    hook      the hook function itself
     * @returns {void}        no feedback is provided  
     */
    public addHook(command: string, name: string, hook: Function): void {

        // add hooks
        if (this.hooks[command] === undefined) {
            this.hooks[command] = {};
        }

        // save hook
        this.hooks[command][name] = hook;
    }
    /**
     * Execute hooks synchronously for a specfic command and apply one or more arguments to the hooks
     * @param   {string}      command   command for which hooks is executed
     * @param   {...any}      args      arguments to be used in the hooks 
     * @returns {void}        no feedback is provided  
     * @throws  Error is thrown if command does not exsists
     */
    public doHooks(command: string, ...args: Array<any>): void {

        // do all hook while providing them with args
        Object.keys(this.hooks[command]).forEach((hookKey: string) => {
            this.hooks[command][hookKey].apply(undefined, args);
        });
    }
    /**
     * Remove a hook by a given name from a command
     * @param   {string}      command   command to remove the hook from
     * @param   {string}      name      name of the hook being removed
     * @returns {void}        no feedback is provided 
     * @throws  Error is thrown if command does not exsists 
     */
    public removeHook(command: string, name: string): void {

        // delete hook or thr
        delete this.hooks[command][name];
    }
}

/**
 * Singelton of the hook class
 */
export const hook: Hook = new Hook();
