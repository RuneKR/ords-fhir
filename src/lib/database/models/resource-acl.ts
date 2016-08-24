import {Query}                              from './Query';

export interface ResourceACL {
    create: HookableModels.ReturnableAll<Query, any> = HookableComponent.returnableAll();
    read: 
    update:
    delete:
}
