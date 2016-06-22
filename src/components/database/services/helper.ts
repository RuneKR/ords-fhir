import {Request, Response, NextFunction}    from '../../routing/routing.models';
import {DatabaseMiddleware}                 from '../database.middleware';
import {DependencyInjectorComponent}        from '../../dependency-injector';

/**
 * Validation routes
 */
@DependencyInjectorComponent.createWith(DatabaseMiddleware)
export class Helper {
    /**
     * add the correct methods to middlewares
     */
    constructor(mw: DatabaseMiddleware) {

        // add to input filters
        mw.filters.input.create.push(this.validateResource);
        mw.filters.input.update.push(this.validateResource);
        mw.filters.input.patch.push(this.validateResourcePartly);
    }
    /**
     * Validate that required fields are in req.body and all the fields in there exist in the resource
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {void}
     */
    private validateResource(req: Request, res: Response, next: NextFunction): void {

        //validate the resource contet
        return next();
    }
    /**
     * Only validate that all the fields in req.body exist in the resource
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {void}
     */
    private validateResourcePartly(req: Request, res: Response, next: NextFunction): void {

        //validate the resource contet
        return next();
    }
}
