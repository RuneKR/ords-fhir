import {HandlerOptions}                     from './models/handler-options';
import {Router}                             from './models/router';
import {RequestHandler}                     from './models/request-handler';
import {RoutingHelper}                      from './routing.helper';
import {HookableComponent, HookableModels}  from '../../lib/hookable';
import {DependencyInjectorComponent}        from '../../lib/dependency-injector';
import {Request, Response}                  from 'express';

@DependencyInjectorComponent.createWith(RoutingHelper)
export class RoutingComponent {
    /**
     * Exectued before all handlers
     */
    public preHandler: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Parse the HTTP body of the request
     */
    public bodyParse: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Exectued after all handlers
     */
    public postHandler: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Reference to express application instance
     */
    private systemRouter: Router = Router();
    /**
     * Reference to express application instance
     */
    private resourceRouter: Router = Router();
    /**
     * Add a handler to handle system interactions
     */
    public addToSystem(options: HandlerOptions, handler: RequestHandler): void {

        // prepare a stack
        let stack: HookableModels.ArgumentableAll<Request, Response> = HookableComponent.argumentableAll();

        // bind hookables
        stack.pre = this.preHandler.pre;
        stack.post = this.postHandler.post;

        // push actual handler handler
        stack.actor.push(handler);

        // prepare and add stack to router
        switch (options.httpmethod) {
            case 'GET':
                this.systemRouter.get(options.path, stack);
                break;
            case 'POST':
                this.systemRouter.post(options.path, this.bodyParse, stack);
                break;
            case 'PUT':
                this.systemRouter.put(options.path, this.bodyParse, stack);
                break;
            case 'DELETE':
                this.systemRouter.delete(options.path, stack);
                break;
            case 'OPTIONS':
                this.systemRouter.options(options.path, stack);
                break;
            default:
                throw new Error('Unsupported HTTP method');

        }
    }
    /**
     * Add a handler to handle resource interactions
     */
    public addToResources(options: HandlerOptions, handler: RequestHandler): void {

        // prepare a stack
        let stack: HookableModels.ArgumentableAll<Request, Response> = HookableComponent.argumentableAll();

        // bind hookables
        stack.pre = this.preHandler.pre;
        stack.post = this.postHandler.post;

        // push actual handler handler
        stack.actor.push(handler);

        // set correct path
        options.path = '/:resource' + options.path;

        // prepare and add stack to router
        switch (options.httpmethod) {
            case 'GET':
                this.resourceRouter.get(options.path, stack);
                break;
            case 'POST':
                this.resourceRouter.post(options.path, this.bodyParse, stack);
                break;
            case 'PUT':
                this.resourceRouter.put(options.path, this.bodyParse, stack);
                break;
            case 'DELETE':
                this.resourceRouter.delete(options.path, stack);
                break;
            case 'OPTIONS':
                this.resourceRouter.options(options.path, stack);
                break;
            default:
                throw new Error('Unsupported HTTP method');

        }
    }
    /**
     * Binds default functions to router and create a new instance
     */
    constructor(rh: RoutingHelper) {

        // cors
        rh.addCors(this.resourceRouter);
        rh.addCors(this.systemRouter);

        // bind default resource parsing
        this.resourceRouter.use(rh.getResourceFromParams);

        // bind auth parsing
        this.resourceRouter.use(rh.getUserFromRequest);
        this.systemRouter.use(rh.getUserFromRequest);

       

    }
}

