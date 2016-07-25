/**
 * Confiuration of the routes that are being added
 */
export interface HandlerOptions {
    /**
     * Indicated if req.user should be populated or resource access will be declined
     */
    protected: boolean;
    /**
     * HTTP method used for this route
     */
    httpmethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';
    /**
     * Relative path to be used for the execution of the handler
     */
    path: string;
}
