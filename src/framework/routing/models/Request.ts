import * as express                             from 'express';
import {ConformResource}                        from '../../conformance/conformance.models';
import {AuthModels}                             from '../../auth';

/**
 * Extended express request object to match ORDS syntax
 */
export interface Request extends express.Request {
    /**
     * Resource that are being interacted with
     */
    resource: ConformResource;
    /**
     * The user doing the interaction
     */
    auth: AuthModels.User;
    /**
     * Query can contain anything and these specific fields
     * TODO: Search parameters should all be added to general search param for conformance
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
