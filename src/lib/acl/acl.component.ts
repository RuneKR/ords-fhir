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
     * Check if there are any limitations on a resource for that given user
     */
    public queryLimitations(resource: string, query: any) {

    }
}
