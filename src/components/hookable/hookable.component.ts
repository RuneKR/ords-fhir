import {Returnable}                from './models/returnable';
import {ReturnableAll}             from './models/returnable-all';
import {ReturnableNext}            from './models/returnable-next';
import {Promise}                   from 'es6-promise';

export class HookableComponent {
    /**
     * Actors can be hooked into here a promise is returned
     */
    public returnable<T, U>(): Returnable<T, U> {

        let f: Returnable<T, U> = function (args: T): Promise<U> {

            return new Promise((resolve: Function, reject: Function) => {

                // create stack that are being run
                let stack: Array<ReturnableNext<T, U>> = f.actor;

                // run stack
                let ReturnableNext: any = function (res: any): void {

                    // check if any functions are left to run
                    if (stack.length === 0) {
                        resolve(res);
                    }

                    // ReturnableNext function to run
                    let func: ReturnableNext<T, U> = stack.shift();

                    // try to run through the whole stack
                    try {
                        func(args, res, ReturnableNext);

                        // catch error and send it back
                    } catch (err) {

                        // send reject back
                        reject(err);
                    }
                };

                // start ReturnableNext
                ReturnableNext();
            });
        };

        // prepare the holders
        f.actor = [];

        return f;
    }
    /**
     * Generate a three layer middleware
     */
    public returnableAll<T, U>(): ReturnableAll<T, U> {

        let f: ReturnableAll<T, U> = function (args: T): Promise<U> {

            return new Promise((resolve: Function, reject: Function) => {

                // create stack that are being run
                let stack: Array<ReturnableNext<T, U>> = [];

                Array.prototype.push.apply(stack, f.pre);
                Array.prototype.push.apply(stack, f.actor);
                Array.prototype.push.apply(stack, f.post);

                // run stack
                let ReturnableNext: any = function (res: any): void {

                    // check if any functions are left to run
                    if (stack.length === 0) {
                        resolve(res);
                    }

                    // ReturnableNext function to run
                    let func: ReturnableNext<T, U> = stack.shift();

                    // try to run through the whole stack
                    try {
                        func(args, res, ReturnableNext);

                        // catch error and send it back
                    } catch (err) {

                        // send reject back
                        reject(err);
                    }
                };

                // start ReturnableNext
                ReturnableNext();
            });
        };

        // prepare the holders
        f.pre = [];
        f.post = [];
        f.actor = [];

        return f;
    }
}
