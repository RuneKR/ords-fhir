import {HandlerOptions, RequestHandler}     from './application.models';
import {Router}                             from 'express';
import {HookableComponent, HookableModels}  from 'make-it-hookable';
import {Request, Response}                  from './shared/models/client-interaction';
import * as parser                          from 'body-parser';
import * as cors                            from 'cors';
import {DependencyInjectorComponent}        from 'di-type';
import {AuthComponent}                      from './lib/auth';
import {ConformanceComponent}               from './lib/conformance';
import {RoutingComponent}                   from './lib/routing';

/**
 * Bootstrap the application together with the libery
 */
@DependencyInjectorComponent.createWith(AuthComponent, ConformanceComponent, RoutingComponent)
export class Bootstrap {
    /**
     * Refernece to injected authcomponent
     */
    private ac: AuthComponent;
    /**
     * Refernece to injected cnformancecomponent
     */
    private cc: ConformanceComponent;
    /**
     * Binds default functions to pre stack
     */
    constructor(ac: AuthComponent, cc: ConformanceComponent, rc: RoutingComponent) {

        // bind references
        this.ac = ac;
        this.cc = cc;

        // calculate whitelist array and set as empty is not specified
        if (process.env.WHITELIST === undefined) {
            process.env.WHITELIST = '';
        }
        let whitelist: Array<string> = process.env.WHITELIST;

        // setup the usage of the whitelist
        rc.preHandlers.actor.push(cors({
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Authentication'],
            credentials: true,
            origin: function (origin: string, callback: Function): void {
                callback(undefined, whitelist.indexOf(origin) !== -1);
            }
        }));

        // bind auth parsing
        rc.preHandlers.actor.push(this.authenticate);

        // parse body application/x-www-form-urlencoded
        rc.bodyParse.actor.push(parser.urlencoded({
            extended: false,
            limit: process.env.LIMIT_UPLOAD_MB ? process.env.LIMIT_UPLOAD_MB + 'mb' : 0.1 + 'mb'
        }));

        // parse application/json
        rc.bodyParse.actor.push(parser.json({
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
    /**
     * Get information about the user performing a request
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void} 
     */
    private authenticate(req: Request, res: Response, next: HookableModels.ArgumentableCb): void {

        // get information about the user
        this.ac.getUser(req).then((user: any) => {

            // bind found user
            req.user = user;

            // go next
            next();
        });
    }
    /**
     * Get information about the requested resource from the request params
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void} 
     */
    private getResourceFromParams(req: Request, res: Response, next: HookableModels.ArgumentableCb): void {

        // grap info about the current route
        let model: any = this.cc.getResource(req.params.resource);

        // check that resource actually exists
        if (model === undefined) {

            // throw some error
        }

        delete req.params.resource;

        // set reference to that
        req.resource = model;

        // go next
        next();
    }
}

