"use strict";
/**
 * ORDS middleware for database connections
 */
var DatabaseMiddleware = (function () {
    function DatabaseMiddleware() {
        /**
         * Actors doing the actual database operation
         */
        this.actors = {
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
        this.filters = {
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
    return DatabaseMiddleware;
}());
exports.DatabaseMiddleware = DatabaseMiddleware;
