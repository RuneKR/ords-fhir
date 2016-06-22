import { Request, Response, NextFunction } from '../../components/routing/routing.models';
/**
 * HL7 FHIR instance interactions
 */
export declare class Type {
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
     * Search a resource
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    search(req: Request, res: Response, next: NextFunction): void;
    /**
     * Search a resource when query is in body
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    search_body(req: Request, res: Response, next: NextFunction): void;
    /**
     * Create a new resource
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    create(req: Request, res: Response, next: NextFunction): void;
}
