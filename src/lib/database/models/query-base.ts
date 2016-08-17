export interface QueryBase {
    query: {
        [key: string]: any;
    };
    limit: number;
    skip: number;
}
