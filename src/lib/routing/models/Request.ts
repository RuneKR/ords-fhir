// external
import * as express                             from 'express';
import {Auth, Resource}                         from 'ords-db';

/**
 * Extended express request object to match ORDS syntax
 */
export interface Request extends express.Request {
    /**
     * Resource that are being interacted with
     */
    resource: Resource;
    /**
     * The user doing the interaction
     */
    auth: Auth;
}
