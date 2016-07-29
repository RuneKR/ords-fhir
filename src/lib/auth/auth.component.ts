import {Request}                            from 'express';
import {HookableComponent, HookableModels}  from 'make-it-hookable';
import {DependencyInjectorComponent}        from 'di-type';
import {User}                               from './models/user';

/**
 * Connect to a database and perform operation in that
 */
@DependencyInjectorComponent.createWith()
export class AuthComponent {
    /**
     * Get the user performing a request
     */
    public getUser: HookableModels.Returnable<Request, User> = HookableComponent.returnable();
    /**
     * Create a new user based upon the information in the request
     */
    public createUser: HookableModels.Returnable<Request, User> = HookableComponent.returnable();
    /**
     * Update information about the user
     */
    public updateUser: HookableModels.Returnable<Request, User> = HookableComponent.returnable();
    /**
     * Delete the user performing the request
     */
    public deleteUser: HookableModels.Returnable<Request, User> = HookableComponent.returnable();
    /**
     * Get information about the user performing a request
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void} 
     */
    private getUserFromRequest(req: Request, res: Response, next: NextFunction): void {

        // get information about the user
        this.ac.getUser(req).then((user: any) => {

            // bind found user
            req.user = user;

            // go next
            next();
        });

    }
}
