export class Constants {
    /**
     * The maxium allowed upload to the server
     */
    public static LIMIT_UPLOAD_MB: number = 0.1;
    /**
     * The URI of the implementation
     */
    public static SERVER_URI: string = 'https://localhost';
    /**
     * Whitelist of domains or ips allowed in cors
     */
    public static WHITELIST: Array<string> = [];
    /**
     * Port used to accept incomming traffic
     */
    public static PORT: number = 8000;
    /**
     * Descripe the relative path from the SERVER_URI that is used to display StructureDefintions
     */
    public static SYSTEM_STRUCTURE_DEFINITION_RELATIVE_URI: string = '/StructureDefinition';
    /**
     * Descripe the relative path from the SERVER_URI that is used to display ValueSets
     */
    public static SYSTEM_VALUE_SET_RELATIVE_URI: string = '/ValueSet';
}
