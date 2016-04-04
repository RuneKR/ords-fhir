/// <reference path='../../typings/tsd.d.ts' />

import * as express from 'express';
import * as https from 'https';
import * as aws from 'aws-sdk';
import * as cors from 'cors';
import {MongoClient} from 'mongodb';
import {con} from './Connection';
import {TypeRoute} from './routes/TypeRoute';
import {InstanceRoute} from './routes/InstanceRoute';

/**
 * Working child of the cluster with the http and https webserver
 */
export class ChildWorker {

    /**
    * main express application
    */
    private app: express.Express;

    /**
    * Start an express application on a https server and configure mongoose and aws
    */
    constructor() {

        // init express
        this.app = express();

        // set the config of aws connection
        aws.config.update({
            credentials: new aws.Credentials(process.env.AWS_ACCESS_KEY, process.env.AWS_SECRET_KEY)
        });

        // setup cors
        this.app.use(cors({
            origin: function(origin: string, callback: Function) {
                callback(null, process.env.WHITELIST.indexOf(origin) !== -1);
            },
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Authentication']
        }));

        // connect to db 
        MongoClient.connect(process.env.MONGO_URI, (err, db) => {

            // display err
            if (err) {
                throw err;
            }

            // save connection 
            con.init(db);

            // setup routs
            this.app.use('/api/',new TypeRoute().route);
            this.app.use('/api/',new InstanceRoute().route);

            // start https server
            /*  
            https.createServer({
              key: fs.readFileSync( 'common/server-key.pem'),
              cert: fs.readFileSync( 'common/server-cert.pem')
            }, this.app).listen(443);
            */

            // start http server
            this.app.listen(process.env.PORT);

        });
    }
}