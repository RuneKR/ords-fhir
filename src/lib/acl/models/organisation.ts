import {Role}      from        './role';

/**
 * Basic organisation class, may be extended as needed
 */
export class Organisation {
    /**
     * Identifier of the organisation
     */
    id: string;
    /**
     * Attached roles in the organisation
     */
    roles: Array<Role>
}
