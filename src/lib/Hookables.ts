// the content of conformance is maintained within the actual conformance class
import {IConformance}                       from '../models/internal/Conformance';

/**
 * All hookable functions are noted here by Class and and main (per) function
 */
export namespace Hookables {
    
    'use strict';
    
    /**
     * All hooks follow this general interface
     */
    export interface General {
        params: any;
        result: any;
    }
    
    export namespace ConformanceManager {

        export interface Build extends General {
            params: IConformance;
            result: IConformance;
        }
    }

    export namespace Requestparser {

        export interface ParseQuery extends General {
            params: {
                query: any;
                resource: string
            };
            result: {};
        }

    }

    export namespace DBManager {

        export interface Create extends General  {
            params: {
                data: any;
                query: any;
                resource: string
            };
            result: {};
        }

        export interface Read extends General  {
            params: {
                limit: number;
                query: any;
                resource: string
            };
            result: Array<any>;
        }

        export interface Update extends General  {
            params: {
                data: any;
                query: any;
                resource: string
            };
            result: {};
        }

        export interface Delete extends General  {
            params: {
                query: any;
                resource: string
            };
            result: any;
        }
    }
}
