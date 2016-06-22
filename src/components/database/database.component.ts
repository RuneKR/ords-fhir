import {Promise}                            from 'es6-promise';
import {Request, Response, RequestHandler}  from '../routing/routing.models';
import {DatabaseMiddleware}                 from './database.middleware';
import {DependencyInjectorComponent}        from '../dependency-injector';

/**
 * Handles connection to a database by doing all middlewares
 */
@DependencyInjectorComponent.createWith(DatabaseMiddleware)
export class DatabaseComponent {
    /**
     * Ref to database middleware
     */
    private dbm: DatabaseMiddleware;
    /**
     * Create new instance of DBManager and bind middleware to it
     */
    constructor(dbm: DatabaseMiddleware) {

        // bind middleware
        this.dbm = dbm;
    }
    /**
     * Create something in the database
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {Promise}     send back response when all middleware has been run
     */
    public create(req: Request, res: Response): Promise<any> {

        // return promise about resolution of task
        return new Promise((resolve: Function, reject: Function) => {

            // create stack that are being run
            let stack: Array<RequestHandler> = [];

            Array.prototype.push.apply(stack, this.dbm.filters.input.create);
            Array.prototype.push.apply(stack, this.dbm.actors.create);
            Array.prototype.push.apply(stack, this.dbm.filters.output.create);

            // run stack
            let next: any = function (): void {

                // check if any functions are left to run
                if (stack.length === 0) {
                    resolve();
                }

                // next function to run
                let func: RequestHandler = stack.shift();

                // try to run through the whole stack
                try {
                    func(req, res, next);

                    // if error is made then operation outcome is updated there
                } catch (err) {

                    // perhaps catch runtime errors that did not set the correct operationoutcome?

                    reject();
                }
            };

            // start next
            next();
        });
    }
    /**
     * Read something from the database
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {Promise}     send back response when all middleware has been run
     */
    public read(req: Request, res: Response): Promise<any> {

        // return promise about resolution of task
        return new Promise((resolve: Function, reject: Function) => {

            // create stack that are being run
            let stack: Array<RequestHandler> = [];

            Array.prototype.push.apply(stack, this.dbm.filters.input.read);
            Array.prototype.push.apply(stack, this.dbm.actors.read);
            Array.prototype.push.apply(stack, this.dbm.filters.output.read);

            // run stack
            let next: any = function (): void {

                // check if any functions are left to run
                if (stack.length === 0) {
                    resolve();
                }

                // next function to run
                let func: RequestHandler = stack.shift();

                // try to run through the whole stack
                try {
                    func(req, res, next);

                    // if error is made then operation outcome is updated there
                } catch (err) {

                    // perhaps catch runtime errors that did not set the correct operationoutcome?

                    reject();
                }
            };

            // start next
            next();
        });
    }
    /**
     * Update something in the database
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {Promise}     send back response when all middleware has been run
     */
    public update(req: Request, res: Response): Promise<any> {

        // return promise about resolution of task
        return new Promise((resolve: Function, reject: Function) => {

            // create stack that are being run
            let stack: Array<RequestHandler> = [];

            Array.prototype.push.apply(stack, this.dbm.filters.input.update);
            Array.prototype.push.apply(stack, this.dbm.actors.update);
            Array.prototype.push.apply(stack, this.dbm.filters.output.update);

            // run stack
            let next: any = function (): void {

                // check if any functions are left to run
                if (stack.length === 0) {
                    resolve();
                }

                // next function to run
                let func: RequestHandler = stack.shift();

                // try to run through the whole stack
                try {
                    func(req, res, next);

                    // if error is made then operation outcome is updated there
                } catch (err) {

                    // perhaps catch runtime errors that did not set the correct operationoutcome?

                    reject();
                }
            };

            // start next
            next();
        });
    }
    /**
     * Create something in the database
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {Promise}     send back response when all middleware has been run
     */
    public delete(req: Request, res: Response): Promise<any> {

        // return promise about resolution of task
        return new Promise((resolve: Function, reject: Function) => {

            // create stack that are being run
            let stack: Array<RequestHandler> = [];

            Array.prototype.push.apply(stack, this.dbm.filters.input.delete);
            Array.prototype.push.apply(stack, this.dbm.actors.delete);
            Array.prototype.push.apply(stack, this.dbm.filters.output.delete);

            // run stack
            let next: any = function (): void {

                // check if any functions are left to run
                if (stack.length === 0) {
                    resolve();
                }

                // next function to run
                let func: RequestHandler = stack.shift();

                // try to run through the whole stack
                try {
                    func(req, res, next);

                    // if error is made then operation outcome is updated there
                } catch (err) {

                    // perhaps catch runtime errors that did not set the correct operationoutcome?

                    reject();
                }
            };
            // start next
            next();
        });
    }
    /**
     * Read history of something in the database
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {Promise}     send back response when all middleware has been run
     */
    public history(req: Request, res: Response): Promise<any> {

        // return promise about resolution of task
        return new Promise((resolve: Function, reject: Function) => {

            // create stack that are being run
            let stack: Array<RequestHandler> = [];

            Array.prototype.push.apply(stack, this.dbm.filters.input.history);
            Array.prototype.push.apply(stack, this.dbm.actors.history);
            Array.prototype.push.apply(stack, this.dbm.filters.output.history);

            // run stack
            let next: any = function (): void {

                // check if any functions are left to run
                if (stack.length === 0) {
                    resolve();
                }

                // next function to run
                let func: RequestHandler = stack.shift();

                // try to run through the whole stack
                try {
                    func(req, res, next);

                    // if error is made then operation outcome is updated there
                } catch (err) {

                    // perhaps catch runtime errors that did not set the correct operationoutcome?

                    reject();
                }
            };

            // start next
            next();
        });
    }
    /**
     * Patch something in the database
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {Promise}     send back response when all middleware has been run
     */
    public patch(req: Request, res: Response): Promise<any> {

        // return promise about resolution of task
        return new Promise((resolve: Function, reject: Function) => {

            // create stack that are being run
            let stack: Array<RequestHandler> = [];

            Array.prototype.push.apply(stack, this.dbm.filters.input.patch);
            Array.prototype.push.apply(stack, this.dbm.actors.patch);
            Array.prototype.push.apply(stack, this.dbm.filters.output.patch);

            // run stack
            let next: any = function (): void {

                // check if any functions are left to run
                if (stack.length === 0) {
                    resolve();
                }

                // next function to run
                let func: RequestHandler = stack.shift();

                // try to run through the whole stack
                try {
                    func(req, res, next);

                    // if error is made then operation outcome is updated there
                } catch (err) {

                    // perhaps catch runtime errors that did not set the correct operationoutcome?

                    reject();
                }
            };

            // start next
            next();
        });
    }
}
