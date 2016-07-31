import {Request, Response}                  from './shared/models/client-interaction';
import * as parser                          from 'body-parser';
import {DependencyInjectorComponent}        from 'di-type';
import {AuthComponent}                      from './lib/auth';
import {ConformanceComponent}               from './lib/conformance';
import {RoutingComponent}                   from './lib/routing';
import {HookableModels}                     from 'make-it-hookable';

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

        // bind auth parsing
        rc.authenticate.actor.push(this.authenticate);
        rc.isResource.actor.push(this.getResourceFromParams);

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

        // set reference to that
        delete req.params.resource;

        // bind model to request
        req.resource = model;

        // go next
        next();
    }
}

