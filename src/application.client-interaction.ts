import {Request}        from    'express';

export interface Request extends Request {
    /**
     * The user perfoming the request
     */
    auth: any;
}
