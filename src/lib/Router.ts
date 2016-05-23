import * as express                          from 'express';
import * as cors                             from 'cors';
import {DI}                                  from './DependencyInjector';
import {Requestparser}                       from './Requestparser';

export {Request, Response, NextFunction}     from 'express';

@DI.createWith()
export class Router {
    /**
     * Reference to express main application
     */
    private app: express.Express = express();
    /**
     * Reference request parser
     */
    private rp: Requestparser;
    /**
     * Create new express router and adds cors based on the whitelist
     */
    constructor(rp: Requestparser) {
        
        // save reference
        this.rp = rp;

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
        args.unshift(path, this.rp.parseBody);

        this.app.get.apply(undefined, args);
    }
    public put(path: string, ...handlers: Array<express.RequestHandler>): void {

        let args: Array<any> = handlers;

        // add paths
        args.unshift(path, this.rp.parseBody);

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
