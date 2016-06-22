import {RequestHandler}     from '../routing/models/RequestHandler';

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
}
