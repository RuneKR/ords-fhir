export namespace Conformance {

    'use strict';

    export interface Configure {

    }
}

export namespace Requestparser {

    'use strict';

    export interface ParseQuery {
        action: {
            query: any;
            resource: string
        };
        result: {};
    }

}

export namespace DBManager {

    'use strict';

    export interface Create {
        action: {
            data: any;
            query: any;
            resource: string
        };
        result: {};
    }

    export interface Read {
        action: {
            limit: number;
            query: any;
            resource: string
        };
        result: Array<any>;
    }

    export interface Update {
        action: {
            data: any;
            query: any;
            resource: string
        };
        result: {};
    }

    export interface Delete {
        action: {
            query: any;
            resource: string
        };
        result: any;
    }

}
