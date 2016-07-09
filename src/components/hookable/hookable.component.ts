import {Returnable}                from './models/returnable';
import {ReturnableAll}             from './models/returnable-all';
import {ReturnableNext}            from './models/returnable-next';
import {Argumentable}              from './models/argumentable';
import {ArgumentableAll}           from './models/argumentable-all';
import {ArgumentableNext}          from './models/argumentable-next';
import {ArgumentableCb}            from './models/argumentable-cb';

import {Promise}                   from 'es6-promise';

/**
 * Set of generic methods that can create hookable methods based upon 
 * actors: Functions that atually perform the method
 * pre: Functions to filter the input to the actors
 * post: Functions that change of the actors
 */
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
                let next: any = function (res: any): void {

                    // check if any functions are left to run
                    if (stack.length === 0) {
                        resolve(res);
                    }

                    // next function to run
                    let func: ReturnableNext<T, U> = stack.shift();

                    // try to run through the whole stack
                    try {
                        func(args, res, next);

                        // catch error and send it back
                    } catch (err) {

                        // send reject back
                        reject(err);
                    }
                };

                // start ReturnableNext
                next();
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
                let next: any = function (res: any): void {

                    // check if any functions are left to run
                    if (stack.length === 0) {
                        resolve(res);
                    }

                    // next function to run
                    let func: ReturnableNext<T, U> = stack.shift();

                    // try to run through the whole stack
                    try {
                        func(args, res, next);

                        // catch error and send it back
                    } catch (err) {

                        // send reject back
                        reject(err);
                    }
                };

                // start ReturnableNext
                next();
            });
        };

        // prepare the holders
        f.pre = [];
        f.post = [];
        f.actor = [];

        return f;
    }
    /**
     * Generate a three layer middleware
     */
    public argumentable<T, U>(): Argumentable<T, U> {

        let f: Argumentable<T, U> = function (req: T, res: U, resolve: ArgumentableCb): void {

            // create stack that are being run
            let stack: Array<ArgumentableNext<T, U>> = [];

            Array.prototype.push.apply(stack, f.actor);

            // run stack
            let next: any = function (err: any): void {

                // send back the error
                if (err !== undefined) {
                    resolve(err);
                }

                // check if any functions are left to run
                if (stack.length === 0) {
                    resolve();
                }

                // next function to run
                let func: ArgumentableNext<T, U> = stack.shift();

                // try to run through the whole stack
                try {
                    func(req, res, next);

                    // catch error and send it back
                } catch (err) {

                    // send reject back
                    resolve(err);
                }
            };

            // start ReturnableNext
            next();
        };

        // prepare the holders
        f.actor = [];

        return f;
    }
    /**
     * Generate a one layer middleware
     */
    public argumentableAll<T, U>(): ArgumentableAll<T, U> {

        let f: ArgumentableAll<T, U> = function (req: T, res: U, resolve: ArgumentableCb): void {

            // create stack that are being run
            let stack: Array<ArgumentableNext<T, U>> = [];

            Array.prototype.push.apply(stack, f.pre);
            Array.prototype.push.apply(stack, f.actor);
            Array.prototype.push.apply(stack, f.post);

            // run stack
            let next: any = function (err: any): void {

                // send back the error
                if (err !== undefined) {
                    resolve(err);
                }

                // check if any functions are left to run
                if (stack.length === 0) {
                    resolve();
                }

                // next function to run
                let func: ArgumentableNext<T, U> = stack.shift();

                // try to run through the whole stack
                try {
                    func(req, res, next);

                    // catch error and send it back
                } catch (err) {

                    // send reject back
                    resolve(err);
                }
            };

            // start ReturnableNext
            next();
        };

        // prepare the holders
        f.pre = [];
        f.post = [];
        f.actor = [];

        return f;
    }
}
