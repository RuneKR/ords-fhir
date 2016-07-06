import {RequestHandler}     from '../routing/models/RequestHandler';
import * as parser          from 'body-parser';

/**
 * Middlware for parsers of data from request
 */
export interface Parsers {
    user: Array<RequestHandler>;
    body: Array<RequestHandler>;
}

/**
 * Middleware for logging requests and responses
 */
export interface Loggers {
    input: Array<RequestHandler>;
    output: Array<RequestHandler>;
}

/**
 * ORDS middleware for routes
 */
export class RoutingMiddleware {
    /**
     * Parsers of body information from request and of user information
     */
    public parsers: Parsers = {
        body: [],
        user: []
    };
    /**
     * Loggers of input and output in form of req.query, req.params, req.body and res.result
     */
    public loggers: Loggers = {
        input: [],
        output: []
    };

    constructor() {

        // parse body application/x-www-form-urlencoded
        this.parsers.body.push(parser.urlencoded({
            extended: false,
            limit: process.env.LIMIT_UPLOAD_MB ? process.env.LIMIT_UPLOAD_MB + 'mb' : 0.1 + 'mb'
        }));

        // parse application/json
        this.parsers.body.push(parser.json({
            limit: process.env.LIMIT_UPLOAD_MB ? process.env.LIMIT_UPLOAD_MB + 'mb' : 0.1 + 'mb'
        }));

    }
}
