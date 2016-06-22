/**
 * Confiuration of the routes that are being added
 */
export interface RouteOptions {
    /**
     * Indicate if these middlwares should be run
     */
    middleware: {
        parsers: {
            user?: boolean;
            body?: boolean;
        };
    };
    /**
     * Indicated if req.user should be populated or resource access will be declined
     */
    protected: boolean;
    /**
     * Indicate if the added route is for a resource
     */
    isResource: boolean;
}
