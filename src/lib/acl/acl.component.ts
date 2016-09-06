export interface ResourceRight {
    [resource: string]: void;
}

export class ACLComponent {
    /**
     * Identifyer of the current conntected user
     */
    public uid: any;
    /**
     * Organisations this belongs to
     */
    public organisations: Array<any>;
    /***
     * Check if the user is authenticated
     */
    private isAuthenticated: boolean;
    /**
     * Rights owned by the connected user
     */
    private rights: { [right: string]: ResourceRight };
    /**
     * Check if the user has the rights to perfom the action for a resource
     */
    public HasRight(right: string, resource?: string): Boolean {

        if (this.rights[right] === undefined) {
            return false;
        } else {
            return true;
        }
    }
    /**
     * Check that the connected has a login
     */
    public isLoggedIn(): Boolean {

        // return boolean
        return this.isAuthenticated;
    }
    /**
     * Create new component for connected user
     */
    constructor(isAuthenticated: boolean) {
        

        //add other here

        // bind input
        this.isAuthenticated = isAuthenticated;
    }

}
