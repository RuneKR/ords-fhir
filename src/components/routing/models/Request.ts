import * as express                             from 'express';
import {Resource}                               from '../../conformance/conformance.models';
import {UserComponent}                          from '../../user';

/**
 * Extended express request object to match ORDS syntax
 */
export interface Request extends express.Request {
    /**
     * Resource that are being interacted with
     */
    resource: Resource;
    /**
     * The user doing the interaction
     */
    user: UserComponent;
    /**
     * Query can contain anything and these specific fields
     */
    query: {
        [key: string]: any;
        /**
         * Number of documents to return
         */
        _count ?: any;
        /**
         * Populate foregin keys in a document see HL7 FHIR search (JOIN)
         */
        _include: string;
        /**
         * Reverse populate foregin keys in a document see HL7 FHIR search (JOIN)
         */
        _revinclude: string;
    };
}
