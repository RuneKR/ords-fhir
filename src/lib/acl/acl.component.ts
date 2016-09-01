export class ACLComponent {
    /**
     * Rights owned by the connected user
     */
    private rights: { [right: string]: boolean };
    /**
     * Check if the user has the rights to perfom the action
     */
    public HasRight(right: string) {

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

        // return true or false
        return true;
    }
    /**
     * Create new component for connected user
     */
    constructor() {

        // do something
    }

}
