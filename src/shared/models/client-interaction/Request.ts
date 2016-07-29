import {Request as AppRequest}     from    '../../../application.client-interaction';
import {Request as AuthRequest}    from    '../../../lib/auth/auth.client-interaction';
import {Request as ConformRequest} from    '../../../lib/conformance/conformance.client-interaction';

/**
 * Extended express request object to match ORDS syntax
 * AppRequest, 
 */
export interface Request extends AuthRequest, ConformRequest {
    req: {
        [key: string]: any;
    }
}
