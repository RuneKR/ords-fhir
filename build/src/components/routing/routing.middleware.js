"use strict";
/**
 * ORDS middleware for routes
 */
var RoutingMiddleware = (function () {
    function RoutingMiddleware() {
        /**
         * Parsers of body information from request and of user information
         */
        this.parsers = {
            body: [],
            user: []
        };
        /**
         * Loggers of input and output in form of req.query, req.params, req.body and res.result
         */
        this.loggers = {
            input: [],
            output: []
        };
    }
    return RoutingMiddleware;
}());
exports.RoutingMiddleware = RoutingMiddleware;
