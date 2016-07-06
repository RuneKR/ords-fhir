import {RequestHandler, Request, Response, NextFunction}   from 'express';
import {All}                                               from './models/all';
import {Actor}                                             from './models/actor';
import {Next}                                              from './models/next';
import {Promise}                                           from 'es6-promise';

export class HookableComponent {
    /**
     * Generate a three layer middleware
     */
    public oneLayer<T>(): Actor<T> {

        let f: Actor<T> = function (args: T): Promise<any> {

            return new Promise((resolve: Function, reject: Function) => {

                // create stack that are being run
                let stack: Array<Next<T>> = f.actor;

                // run stack
                let next: any = function (res: any): void {

                    // check if any functions are left to run
                    if (stack.length === 0) {
                        resolve(res);
                    }

                    // next function to run
                    let func: Next<T> = stack.shift();

                    // try to run through the whole stack
                    try {
                        func(args, res, next);

                        // catch error and send it back
                    } catch (err) {

                        // send reject back
                        reject(err);
                    }
                };

                // start next
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
    public threeLayer<T>(): All<T> {

        let f: All<T> = function (args: T): Promise<any> {

            return new Promise((resolve: Function, reject: Function) => {

                // create stack that are being run
                let stack: Array<Next<T>> = [];

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
                    let func: Next<T> = stack.shift();

                    // try to run through the whole stack
                    try {
                        func(args, res, next);

                        // catch error and send it back
                    } catch (err) {

                        // send reject back
                        reject(err);
                    }
                };

                // start next
                next();
            });
        };

        // prepare the holders
        f.pre = [];
        f.post = [];
        f.actor = [];

        return f;
    }
}
