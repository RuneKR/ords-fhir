import {RoutingModels}     from '../routing';

/**
 * Middlware for all middlwares
 */
export interface Filters {
    /**
     * Filter of req.query, req.body etc
     */
    input: MiddlewareHolders;
    /**
     * Filter of res.result etc
     */
    output: MiddlewareHolders;
}

/**
 * Middlware for all the different kinds of database operations
 */
export interface MiddlewareHolders {
    create: Array<RoutingModels.RequestHandler>;
    read: Array<RoutingModels.RequestHandler>;
    update: Array<RoutingModels.RequestHandler>;
    delete: Array<RoutingModels.RequestHandler>;
    history: Array<RoutingModels.RequestHandler>;
    patch: Array<RoutingModels.RequestHandler>;
}

/**
 * ORDS middleware for database connections
 */
export class DatabaseMiddleware {
    /**
     * Actors doing the actual database operation
     */
    public actors: MiddlewareHolders = {
        create: [],
        delete: [],
        history: [],
        patch: [],
        read: [],
        update: []
    };
    /**
     * Filters for database operations
     */
    public filters: Filters = {
        input: {
            create: [],
            delete: [],
            history: [],
            patch: [],
            read: [],
            update: []
        },
        output: {
            create: [],
            delete: [],
            history: [],
            patch: [],
            read: [],
            update: []
        }
    };
}
