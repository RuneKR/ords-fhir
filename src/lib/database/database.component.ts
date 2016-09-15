import {HookableComponent, HookableModels}  from 'make-it-hookable';
import {DBOperations}                       from './models/db-operations';
import {Component}                          from 'di-type';
import {Resource}                           from './models/Resource';

/**
 * Connect to a database and perform operation in that
 */
@Component({
    directives: [],
    providers: []
})
export class DatabaseComponent {
    /**
     * Resources in the database
     */
    public resource: { [resource: string]: Resource };
    /**
     * Libery methods performing actual operations in the database
     */
    public _lib: DBOperations;
    /**
     * Attach resource to the database
     */
    public attachResource(resource: Resource): void {

        // TODO: check allready existing resource

        // save reference to resource
        this.resource[resource.name] = resource;
    }

}
