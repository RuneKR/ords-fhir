/**
 * Specification on how to run the application
 */
export interface Options {
    /**
     * Port to run the application
     */
    port: number;
    /**
     * Prefix to be added to all routes
     */
    prefix: string;
}

/**
 * Confiuration of the routes that are being added
 */
export interface HandlerOptions {
    /**
     * Indicated if req.user should be populated or resource access will be declined
     */
    protected: boolean;
    /**
     * HTTP method used for this route
     */
    httpmethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';
    /**
     * Relative path to be used for the execution of the handler
     */
    path: string;
}
export {RequestHandler}   from 'express';
import {Request}        from    'express';
export interface Request extends Request {
    /**
     * Request params in the route
     */
    params: {
        /**
         * Can contain all sorts of params depending on the path
         */
        [key: string]: any;
        /**
         * The resource that the route path is for
         */
        resource: any;
    }
    /**
     * The user perfoming the request
     */
    auth: any;
}
