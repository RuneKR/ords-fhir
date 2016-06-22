import { DatabaseMiddleware } from '../database.middleware';
/**
 * Validation routes
 */
export declare class Helper {
    /**
     * add the correct methods to middlewares
     */
    constructor(mw: DatabaseMiddleware);
    /**
     * Validate that required fields are in req.body and all the fields in there exist in the resource
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {void}
     */
    private validateResource(req, res, next);
    /**
     * Only validate that all the fields in req.body exist in the resource
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {void}
     */
    private validateResourcePartly(req, res, next);
}
