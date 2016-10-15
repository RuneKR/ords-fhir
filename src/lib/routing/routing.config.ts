export class RoutingConfig {
    /**
     * The maxium allowed upload to the server
     */
    public LIMIT_UPLOAD_MB: number = 0.1;
    /**
     * The URI of the implementation
     */
    public SERVER_URI: string = 'https://localhost';
    /**
     * Whitelist of domains or ips allowed in cors
     */
    public WHITELIST: Array<string> = [];
    /**
     * Port used to accept incomming traffic
     */
    public PORT: number = 8000;
}
