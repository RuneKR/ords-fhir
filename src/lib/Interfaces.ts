/**
 * Keys are sting in the object and keys can be anything
 */
export interface StringMapAny {
    [key: string]: any;
}

/**
 * Configuration element of ords-fhir
 */
export interface Config {
    [key: string]: any;
    LIMIT_UPLOAD_MB: number;
    PORT: number;
    WHITELIST: Array<string>;
    modules: Array<ModuleConfig>;
}

/**
 * Configuration for every module
 */
export interface ModuleConfig {
    config: StringMapAny;
    module: string;
}
