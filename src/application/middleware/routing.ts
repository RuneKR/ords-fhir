import {RoutingMiddleware}                                              from '../../components/routing';
import {DependencyInjectorComponent}                                    from '../../components/dependency-injector';
import * as parser                                                      from 'body-parser';

/**
 * ORDS middleware for routes
 */
@DependencyInjectorComponent.createWith(RoutingMiddleware)
export class Routing {
    /**
     * Adds default middleware
     */
    constructor(rm: RoutingMiddleware) {

        // parse body application/x-www-form-urlencoded
        rm.parsers.body.push(parser.urlencoded({
            extended: false,
            limit: process.env.LIMIT_UPLOAD_MB ? process.env.LIMIT_UPLOAD_MB + 'mb' : 0.1 + 'mb'
        }));

        // parse application/json
        rm.parsers.body.push(parser.json({
            limit: process.env.LIMIT_UPLOAD_MB ? process.env.LIMIT_UPLOAD_MB + 'mb' : 0.1 + 'mb'
        }));
    }
}
