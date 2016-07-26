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
