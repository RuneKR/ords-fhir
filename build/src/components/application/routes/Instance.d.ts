import { Request, Response, NextFunction } from '../../routing/routing.models';
/**
 * HL7 FHIR instance interactions
 */
export declare class Instance {
    /**
     * Reference to database component
     */
    private dc;
    /**
     * Reference to route component
     */
    private rc;
    /**
     * Binding the routes their function
     */
    constructor();
    /**
     * Read a specific instance of an resource
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    read(req: Request, res: Response, next: NextFunction): void;
    /**
     * Update a specific instance of an resource
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    update(req: Request, res: Response, next: NextFunction): void;
    /**
     * Delete a specific instance of an resource
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    delete(req: Request, res: Response, next: NextFunction): void;
}
