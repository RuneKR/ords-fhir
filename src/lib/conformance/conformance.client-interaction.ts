import {Request} from   'express';

/**
 * Extended express request object to match ORDS syntax
 */
export interface Request extends Request {  
    req: {
        params: {
            
        }
    };

}
