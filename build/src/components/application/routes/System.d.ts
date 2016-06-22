import { Request, Response, NextFunction } from '../../routing/routing.models';
/**
 * HL7 FHIR instance interactions
 */
export declare class System {
    /**
     * Reference to conformance
     */
    private rsc;
    /**
     * Reference to route component
     */
    private rm;
    /**
     * Binding the routes their function
     */
    constructor();
    /**
     * Display a valueset
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    displayValueset(req: Request, res: Response, next: NextFunction): void;
    /**
     * Display a specific structure def
     * @param   {Request}       req     requrest from the client
     * @param   {Response}      res     responsehandler for the client
     * @param   {NextFunction}  next    next handler after this
     * @returns {Void}
     */
    displayStructureDef(req: Request, res: Response, next: NextFunction): void;
    /**
     * Display the conformance statement
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     responsehandler for the client
     * @returns {Void}
     */
    displayConStatement(req: Request, res: Response, next: NextFunction): void;
}
