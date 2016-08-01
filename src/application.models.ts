/**
 * Specification on how to run the application
 */
export interface Options {
    /**
     * Port to run the application
     */
    port: number;
    /**
     * Prefix to be added to all routes
     */
    prefix: string;
    /**
     * Whitelist for domains in cors
     */
    whitelist: Array<string>;
}
