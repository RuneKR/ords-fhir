import * as express                          from 'express';
import * as cors                             from 'cors';

export {Request, Response, NextFunction}     from 'express';

export class Router {
    /**
     * Reference to resourcemanager
     */
    private app: express.Express = express();
    /**
     * Create new express router and adds cors based on the whitelist
     */
    constructor() {

        // setup cors
        this.app.use(cors({
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Authentication'],
            credentials: true,
            origin: function (origin: string, callback: Function): void {
                callback(undefined, process.env.WHITELIST.indexOf(origin) !== -1);
            }
        }));

    }
    public get(path: string, ...handlers: Array<express.RequestHandler>): void {

        let args: Array<any> = handlers;

        // add paths
        args.unshift(path);

        this.app.get.apply(undefined, args);
    }
    public post(path: string, ...handlers: Array<express.RequestHandler>): void {

        let args: Array<any> = handlers;

        // add paths
        args.unshift(path);

        this.app.get.apply(undefined, args);
    }
    public put(path: string, ...handlers: Array<express.RequestHandler>): void {

        let args: Array<any> = handlers;

        // add paths
        args.unshift(path);

        this.app.get.apply(undefined, args);
    }
    public delete(path: string, ...handlers: Array<express.RequestHandler>): void {

        let args: Array<any> = handlers;

        // add paths
        args.unshift(path);

        this.app.get.apply(undefined, args);
    }
    public listen(port: number): void {

        this.app.listen(port);
    }
}
