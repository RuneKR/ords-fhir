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
     * Prefix to be added to all routes
     */
    whitelist: Array<string>;
}
/**
 * Main ORDS FHIR application
 */
export declare class ApplicationComponent {
    /**
     * Reference to routing component singleton
     */
    private rc;
    /**
     * Instanciated routes
     */
    private routes;
    /**
     * Router
     */
    private router;
    /**
     * Start the router to listen on incomming traffic
     * @param   {Options}     options     the options specificing how to listen
     * @returns {void}
     */
    constructor(options: Options);
}
