import {Request} from   'express';
import {User}    from   './models/User';

/**
 * Extended express request object to match ORDS syntax
 */
export interface Request extends Request {  
    auth: User;
}
