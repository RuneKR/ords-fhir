import * as express from 'express';
/**
 * Extended express response object to match ORDS syntax
 */
export interface Response extends express.Response {
    /**
     * Result of operations
     */
    result: any;
}
