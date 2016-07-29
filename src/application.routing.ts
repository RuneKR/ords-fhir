import {HandlerOptions, RequestHandler}     from './application.models';
import {Router}                             from 'express';
import {HookableComponent, HookableModels}  from 'make-it-hookable';
import {Request, Response}                  from 'express';
import * as parser                          from 'body-parser';
import * as cors                            from 'cors';

export class ApplicationRouting {
    /**
     * Run prior to the handlers in the system
     */
    public preHandlers: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Run prior to the handlers in the system
     */
    public postHandlers: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Parse the HTTP body of the request
     */
    public bodyParse: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Authentication handlers
     */
    public authenticate: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Reference to express application instance
     * Use on OWN risk inteded visible for the Application class only
     */
    public router: Router = Router();
    /**
     * Add a handler to handle system interactions
     */
    public addToSystem(options: HandlerOptions, ...handlers: Array<RequestHandler>): void {

        // prepare a stack
        let stack: HookableModels.ArgumentableAll<Request, Response> = HookableComponent.argumentableAll();

        // bind hookables
        stack.pre = this.preHandlers.actor;
        stack.post = this.postHandlers.actor;

        // protected then check it
        if (options.protected === true) {
            stack.actor.push(this.isAuthenticated);
        }

        // push actual handler handler
        Array.prototype.push.apply(stack.actor, handlers);

        // prepare and add stack to router
        switch (options.httpmethod) {
            case 'GET':
                this.router.get(options.path, stack);
                break;
            case 'POST':
                this.router.post(options.path, this.bodyParse, stack);
                break;
            case 'PUT':
                this.router.put(options.path, this.bodyParse, stack);
                break;
            case 'DELETE':
                this.router.delete(options.path, stack);
                break;
            case 'OPTIONS':
                this.router.options(options.path, stack);
                break;
            default:
                throw new Error('Unsupported HTTP method');

        }
    }
    /**
     * Binds default functions to pre stack
     */
    constructor() {

        // calculate whitelist array and set as empty is not specified
        if (process.env.WHITELIST === undefined) {
            process.env.WHITELIST = '';
        }
        let whitelist: Array<string> = process.env.WHITELIST;

        // setup the usage of the whitelist
        this.preHandlers.actor.push(cors({
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Authentication'],
            credentials: true,
            origin: function (origin: string, callback: Function): void {
                callback(undefined, whitelist.indexOf(origin) !== -1);
            }
        }));

        // bind auth parsing
        this.preHandlers.actor.push(this.authenticate);

        // parse body application/x-www-form-urlencoded
        this.bodyParse.actor.push(parser.urlencoded({
            extended: false,
            limit: process.env.LIMIT_UPLOAD_MB ? process.env.LIMIT_UPLOAD_MB + 'mb' : 0.1 + 'mb'
        }));

        // parse application/json
        this.bodyParse.actor.push(parser.json({
            limit: process.env.LIMIT_UPLOAD_MB ? process.env.LIMIT_UPLOAD_MB + 'mb' : 0.1 + 'mb'
        }));

    }
    /**
     * Check that a user is actually authenticated
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run
     * @return {void} 
     */
    private isAuthenticated(req: Request, res: Response, next: HookableModels.ArgumentableCb): void {

        // check if user is set
        if (req.user === undefined) {

            // do some return of an error with next(error)
        } else {
            next();
        }
    }
}

