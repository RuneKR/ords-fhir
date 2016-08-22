/**
 * Permissions a role can have
 * The array indicate if their are any resources the permission apply to
 */
export interface RolePermissions {
    [permission: string]: {
        /**
         * Resources affected by this permission
         */
        resources: Array<string>;
        /**
         * Weather or not the permission limits or grants access to the affected resources
         */
        isLimited: boolean;
    }
}

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
     * Create, Read, Update, Delete, Patch and History are database related but others might be created as needed by a developer
     */
    permissions: RolePermissions;
}
