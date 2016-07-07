import {Request}                            from 'express';
import {HookableComponent, HookableModels}  from '../hookable';
import {DependencyInjectorComponent}        from '../dependency-injector';
import {User}                               from './models/user';

/**
 * Connect to a database and perform operation in that
 */
@DependencyInjectorComponent.createWith(HookableComponent)
export class AuthComponent {
    /**
     * Get the user performing a request
     */
    public getUser: HookableModels.ReturnableAll<Request, User>;
    /**
     * Create a new user based upon the information in the request
     */
    public createUser: HookableModels.ReturnableAll<Request, User>;
    /**
     * Update information about the user
     */
    public updateUser: HookableModels.ReturnableAll<Request, User>;
    /**
     * Delete the user performing the request
     */
    public deleteUser: HookableModels.ReturnableAll<Request, User>;
    /**
     * Create new instance of DBManager and bind middleware to it
     */
    constructor(hc: HookableComponent) {

        // init hookable
        this.getUser     = hc.returnableAll();
        this.createUser  = hc.returnableAll();
        this.updateUser  = hc.returnableAll();
        this.deleteUser  = hc.returnableAll();

    }
}
