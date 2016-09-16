import {DatabaseConfig}                     from './database.config';
import {DBOperations}                       from './models/db-operations';

export class DBModel implements DBOperations {
    /**
     * Instance references to db connection
     */
    private db: DatabaseConfig;
    /**
     * Reference to resource
     */
    private resource: Resource;
    /**
     * Create new intance of a db model
     */
    constructor(db: DatabaseConfig, resource: Resource) {

        this.db = db;
        this.resource = resource;
    }
}
