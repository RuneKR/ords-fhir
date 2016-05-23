import {Promise}                    from 'es6-promise';

export *                            from './HookableFunctions'; 

export interface Stack {
    [key: string]: {
        [key: string]: Function;
    };
}

/**
 * Hook manager and container for commands executed within the application
 * @class Hook
 */
export class HookManager {
    /**
     * Container of all hooks related to their commands
     * @type {StringMapFunction}
     */
    private stack: Stack = {};
    /**
     * Add a named hook to a speicific command or create a new command and add the hook to that command
     * @param   {string}      command   command to be hooked into
     * @param   {string}      name      name of the hook being added
     * @param   {Function}    hook      the hook function itself
     * @returns {void}        no feedback is provided  
     */
    public addHook(cmd: any, name: string, hook: Function): void {

        // add hooks
        if (this.stack[cmd] === undefined) {

            this.stack[cmd] = {};
        }

        // save hook
        this.stack[cmd][name] = hook;
    }
    /**
     * Execute hooks for a specfic command and apply one or more arguments to the hooks
     * @param   {string}      command   command for which hooks is executed
     * @param   {...any}      args      arguments to be used in the hooks 
     * @returns {Promise}     Indication of weather or not command exsists
     */
    public doHooks(command: string, args: Function): Promise<any> {

        // return the promise
        return new Promise(function (resolve: Function, reject: Function): void {

            // validate it exsists
            if (this.hooks[command] === undefined) {

                // do nothing
                resolve(args);

            } else {

                // calculate functions to run and sort them by alpha
                let funcsToRun: Array<string> = Object.keys(this.hooks[command]).sort();

                // keep ref to self
                let self: any = this;

                // the next funciton
                let next: any = function (): void {

                    // check if any functions are left to run
                    if (funcsToRun.length === 0) {
                        resolve(args);
                    }

                    let funcName: string = funcsToRun.shift();

                    try {
                        self.hooks[command][funcName].apply(undefined, [args]);
                    } catch (err) {
                        reject(err);
                    }
                };

                next.apply(undefined, [args]);
            }
        });
    }
    /**
     * Remove a hook by a given name from a command
     * @param   {string}      command   command to remove the hook from
     * @param   {string}      name      name of the hook being removed
     * @returns {void}        no feedback is provided 
     * @throws  Error is thrown if command does not exsists 
     */
    public removeHook(cmd: string, name: string): void {

        // validate it exsists
        if (this.stack[cmd] === undefined) {
            throw new Error('Command does not exsists');
        }

        // delete hook
        delete this.stack[cmd][name];
    }
}
