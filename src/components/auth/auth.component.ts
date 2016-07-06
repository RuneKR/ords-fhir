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
    public getUser: HookableModels.All<Request, User>;
    /**
     * Create a new user based upon the information in the request
     */
    public createUser: HookableModels.All<Request, User>;
    /**
     * Update information about the user
     */
    public updateUser: HookableModels.All<Request, User>;
    /**
     * Delete the user performing the request
     */
    public deleteUser: HookableModels.All<Request, User>;
    /**
     * Create new instance of DBManager and bind middleware to it
     */
    constructor(hc: HookableComponent) {

        // init hookable
        this.getUser     = hc.threeLayer();
        this.createUser  = hc.threeLayer();
        this.updateUser  = hc.threeLayer();
        this.deleteUser  = hc.threeLayer();

    }
}
