import * as express                             from 'express';
import {ConformResource}                        from '../resources';
import {AuthModels}                             from '../../../lib/auth';

/**
 * Extended express request object to match ORDS syntax
 */
export interface Request extends express.Request {
    /**
     * Resource that are being interacted with
     */
    resource: ConformResource;
    /**
     * The user doing the interaction
     */
    auth: AuthModels.User;
}
