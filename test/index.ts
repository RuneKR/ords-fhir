import {ConformanceComponent, DatabaseMiddleware, RoutingComponent}   from '../src';
import {Application, DependencyInjectorComponent, RoutingModels}      from '../src';
import {Patient}                                           from './dbcon/Patient';
import {instance}                                          from './dbcon/db';

@DependencyInjectorComponent.createWith(ConformanceComponent, DatabaseMiddleware, RoutingComponent)
export class Implementation {
    private app: Application;
    constructor(rm: ConformanceComponent, dbm: DatabaseMiddleware, routem: RoutingComponent) {

        // do something with adding resources
        //rm.addResource(new Patient());

        // add exit route
        routem.get(
            '/exit', 
            { isResource: false, middleware: { parsers: {} }, protected: false }, 
            (req: RoutingModels.Request, res: RoutingModels.Response, next: RoutingModels.NextFunction) => {
            res.send('bye');

            // terminate all of the cluster
            process.send({ cmd: 'terminate' });
        });

        // add a feedback
        dbm.actors.read.push(
            (req: RoutingModels.Request, res: RoutingModels.Response, next: RoutingModels.NextFunction) => {
            res.result = instance[req.resource.name];
            next();
        });

        // start application
        this.app = new Application({ port: 8000, prefix: '/api' });

        console.log('Pleas go to your browser');
        console.log('Visit /exit');
    }
}
