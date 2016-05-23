import * as express                          from 'express';
import * as cors                             from 'cors';
import {DI}                                  from './DependencyInjector';
import {Requestparser}                           from '../lib/Requestparser';

export {Request, Response, NextFunction}     from 'express';

export interface Options {
    parseQuery?: boolean;
    parseBody?: boolean;
    merge?: boolean;
    boundle?: boolean;
    /**
     * Force req.params.resource to be this
     */
    forceResource?: string;
}

@DI.createWith(Requestparser)
export class Router {
    /**
     * request parser
     * @type {Requestparser}
     */
    private rp: Requestparser;
    /**
     * Reference to express main application
     */
    private app: express.Express = express();
    /**
     * Create new express router and adds cors based on the whitelist
     */
    constructor(rp: Requestparser) {
        
        // save injected reference
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
    public get(path: string, options: Options, ...handlers: Array<express.RequestHandler>): void {
        
        let args: Array<any> = handlers;
        
        // DO SOMETHING WITH forceResource
        // DO SOMETHING WITH BOUNDLE FLAG
               
        // if query is enabled
        if (options.parseQuery) {
            args.unshift(this.rp.parseQuery);
        }

        // add paths
        args.unshift(path);

        this.app.get.apply(this.app, args);
    }
    public post(path: string, options: Options, ...handlers: Array<express.RequestHandler>): void {

        let args: Array<any> = handlers;
        
        // DO SOMETHING WITH forceResource
        // DO SOMETHING WITH BOUNDLE FLAG
        
        // if body should be parsed
        if (options.parseBody) {
            args.unshift(this.rp.parseBody);
        }
        
        // if body should be merged to query
        if (options.merge) {
            args.unshift(this.rp.merge);
        }
        
        // if query is enabled
        if (options.parseQuery) {
            args.unshift(this.rp.parseQuery);
        }

        // add paths
        args.unshift(path);

        this.app.get.apply(this.app, args);
    }
    public put(path: string, options: Options, ...handlers: Array<express.RequestHandler>): void {

        let args: Array<any> = handlers;
        
        // DO SOMETHING WITH forceResource
        // DO SOMETHING WITH BOUNDLE FLAG
        
        // if body should be parsed
        if (options.parseBody) {
            args.unshift(this.rp.parseBody);
        }
        
        // if body should be merged to query
        if (options.merge) {
            args.unshift(this.rp.merge);
        }
        
        // if query is enabled
        if (options.parseQuery) {
            args.unshift(this.rp.parseQuery);
        }

        // add paths
        args.unshift(path);

        this.app.get.apply(this.app, args);
    }
    public delete(path: string, options: Options, ...handlers: Array<express.RequestHandler>): void {

        let args: Array<any> = handlers;
        
        // DO SOMETHING WITH forceResource
        // DO SOMETHING WITH BOUNDLE FLAG
        
         // if query is enabled
        if (options.parseQuery) {
            args.unshift(this.rp.parseQuery);
        }

        // add paths
        args.unshift(path);

        this.app.get.apply(this.app, args);
    }
    public listen(port: number): void {

        this.app.listen(port);
    }
}
