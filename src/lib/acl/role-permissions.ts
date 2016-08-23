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
