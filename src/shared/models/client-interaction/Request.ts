import * as express                             from 'express';
import {ConformanceModels}                      from '../../../lib/conformance';
import {AuthModels}                             from '../../../lib/auth';

/**
 * Extended express request object to match ORDS syntax
 */
export interface Request extends express.Request {
    /**
     * Resource that are being interacted with
     */
    resource: ConformanceModels.ConformResource;
    /**
     * The user doing the interaction
     */
    auth: AuthModels.User;
}
