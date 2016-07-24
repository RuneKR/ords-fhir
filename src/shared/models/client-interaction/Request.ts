import * as express                             from 'express';
import {ConformanceModels}                      from '../../../framework/conformance';
import {AuthModels}                             from '../../../framework/auth';

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
    /**
     * Query can contain anything and these specific fields
     */
    query: {
        [key: string]: any;
    };
}
