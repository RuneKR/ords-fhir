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
    public getUser: HookableModels.Returnable<Request, User>;
    /**
     * Create a new user based upon the information in the request
     */
    public createUser: HookableModels.Returnable<Request, User>;
    /**
     * Update information about the user
     */
    public updateUser: HookableModels.Returnable<Request, User>;
    /**
     * Delete the user performing the request
     */
    public deleteUser: HookableModels.Returnable<Request, User>;
    /**
     * Create new instance of DBManager and bind middleware to it
     */
    constructor(hc: HookableComponent) {

        // init hookable
        this.getUser     = hc.returnable();
        this.createUser  = hc.returnable();
        this.updateUser  = hc.returnable();
        this.deleteUser  = hc.returnable();

    }
}
