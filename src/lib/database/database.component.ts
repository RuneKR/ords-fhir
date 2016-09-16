import {DatabaseConfig}                     from './database.config';
import {Component}                          from 'di-type';
import {Resource}                           from './models/Resource';
import {DBModel}                            from './models/db-model';

/**
 * Connect to a database and perform operation in that
 */
@Component({
    directives: [DatabaseConfig],
    providers: []
})
export class DatabaseComponent {
    /**
     * Resource builded to a model
     */
    public model: { [resource: string]: DBModel };
    /**
     * Libery methods performing actual operations in the database
     */
    private config: DatabaseConfig;
    /**
     * Create a new database instance
     */
    constructor(config: DatabaseConfig) {

        this.config = config;
    }
    /**
     * Attach resource to the database
     */
    public attachResource(resource: Resource): void {

        // TODO: check allready existing resource

        // save reference to resource and give that a reference to the db lib
        this.model[resource.name] = new DBModel(this.config, resource);
    }

}
