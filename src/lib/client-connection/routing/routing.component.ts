import {Request}                            from './models/request';
import {Response}                           from './models/response';
import {HookableModels}                     from 'make-it-hookable';
import * as parser                          from 'body-parser';
import {Constants}                          from '../../../shared/services/constants';
import {Component}                          from 'di-type';
import {ConformanceComponent}               from '../../conformance';
import * as express                         from 'express';
import * as cors                            from 'cors';
import {RoutingConfig}                      from './routing.config';

@Component({
    directives: [Constants, RoutingConfig],
    providers: []
})
export class RoutingComponent {
    /**
     * Refernce in conformance instance
     */
    private conformance: ConformanceComponent;
    /**
     * Router
     */
    private router: express.Express;
    /**
     * Start up and listen for incomming traffic
     */
    constructor(constants: Constants, config: RoutingConfig) {

        // parse body application/x-www-form-urlencoded
        config.bodyParse.actor.push(parser.urlencoded({
            extended: false,
            limit: process.env.LIMIT_UPLOAD_MB ? constants.LIMIT_UPLOAD_MB + 'mb' : 0.1 + 'mb'
        }));

        // parse application/json
        config.bodyParse.actor.push(parser.json({
            limit: process.env.LIMIT_UPLOAD_MB ? constants.LIMIT_UPLOAD_MB + 'mb' : 0.1 + 'mb'
        }));

        // init instance of router
        this.router = express();
        
        // setup the usage of the whitelist
        this.router.use(cors({
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Authentication'],
            credentials: true,
            origin: function (origin: string, callback: Function): void {
                callback(undefined, constants.WHITELIST.indexOf(origin) !== -1);
            }
        }));

        // bind routers from routing component
        this.router.use(config._routers.system);
        this.router.use(this.isResource);
        this.router.use(config._routers.resource);

        // start to listen for input
        this.router.listen(constants.PORT);
    }
    /**
     * Get information about the requested resource from the request params
     * @param  {Request}      req        request send to the server
     * @param  {Response}     res        respond to be send by the server
     * @param  {NextFunction} res        next function to be run of middlewares
     * @return {void} 
     */
    private isResource(req: Request, res: Response, next: HookableModels.ArgumentableCb): void {

        // grap info about the current route
        let model: any = this.conformance.getResource(req.params.resource);

        // check that resource actually exists
        if (model === undefined) {

            // throw some error
        }

        // set reference to that
        delete req.params.resource;

        // bind model to request
        req.resource = model;

        // go next
        next();
    }
}
