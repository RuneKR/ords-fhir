import {RolePermissions}        from    './role-permissions';

/**
 * Basic role class, may be extended as needed
 */
export class Role {
    /**
     * Identifier of the role
     */
    id: string;
    /**
     * Permissions attached to this role
     */
    permissions: RolePermissions;
}
