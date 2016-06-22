import { RoutingModels } from '../routing';
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
export declare class DatabaseMiddleware {
    /**
     * Actors doing the actual database operation
     */
    actors: MiddlewareHolders;
    /**
     * Filters for database operations
     */
    filters: Filters;
}
