import {PopulationLevel} from 'ts-objectschema';
import {Router} from 'express';
import {dbm} from './DBManager';
import * as parser from 'body-parser';

/**
 * Parse incomming requests into a MongoDB query form
 */
export class Requestparser {
    /**
     * Prefixes that a query can contain
     */
    private queryValuePrefix: Array<string> = ['eq', 'ne', 'gt', 'lt', 'ge', 'le', 'sa', 'eb', 'ap'];
    /**
     * Query params received from express based on FHIR
     * @param params
     * @returns new query
     */
    public query(modelname: string, params: { [key: string]: any }): Object {

        // holder for parsed query
        let query: { [key: string]: any } = {};

        // temp comparator data
        let comparator: any;

        // temp value
        let value: any;

        // keys
        let keys: Array<string>;

        // temp data
        let temp: { [key: string]: any };

        // temp type of data query element
        let type: any;

        // the model instance
        let model: any;

        try {
            model = new dbm.models[modelname]({}, PopulationLevel.none);
        } catch (e) {
            throw new Error('Model do not exsists and therefor cannot be searched');
        }

        // loop all params
        Object.keys(params).forEach((param: string) => {

            // split by dot notation
            keys = param.split('.');
            value = params[param];
            comparator = '$eq';

            // check if any prefix is set in query and integers are passed after the prefix
            if (this.queryValuePrefix.indexOf(value.substr(0, 2)) !== 1
                && !!parseInt(value.substr(2, 1), 10)) {    // 10 is chosen could be others

                // set mongodb $ and prefix as key and read the value after prefix
                comparator = '$' + value.substr(0, 2);
                value = value.substr(2);
            }

            // set value to correct time and see if search is allowed on it
            type = this.deepLoopQuery(model, keys);

            // update value based on type 
            value = model.getValueFromClass(type, value, PopulationLevel.search);

            // prepare query
            temp = {};
            temp[comparator] = value;
            query[param] = temp;
        });

        // return the new query
        return query;
    }

    /**
     * Parse body input from request to req.body
     * @param {Router}     router      instance of express routing object
     * @returns {void}     no feedback is provided back
     */
    public bodyParser(router: Router): void {

        // parse application/x-www-form-urlencoded
        router.post('*', parser.urlencoded({
            extended: false,
            limit: process.env.LIMIT_UPLOAD_MB + 'mb'
        }));

        router.put('*', parser.urlencoded({
            extended: false,
            limit: process.env.LIMIT_UPLOAD_MB + 'mb'
        }));

        // parse application/json
        router.post('*', parser.json({
            limit: process.env.LIMIT_UPLOAD_MB + 'mb'
        }));

        router.put('*', parser.json({
            limit: process.env.LIMIT_UPLOAD_MB + 'mb'
        }));
    }
    private deepLoopQuery(model: { [key: string]: any }, keys: Array<string>, wasArray?: boolean): any {

        let key: string = keys.shift();

        // check if key is specified array and former key was an array
        if (!!parseInt(key, 10) && wasArray === true) {
            key = keys.shift();
        }

        // check key exsists and is searchable
        if (typeof model[key] === 'undefined'
            || model[key].search !== true) {
            throw new Error('Key is undefined in model');
        }

        // return type or continue
        if (keys.length === 0) {
            return model[key].type;
        } else {

            // set new model
            if (Array.isArray(model[key].type)) {
                model = new model[key].type[0]({}, PopulationLevel.none);
            } else {
                model = new model[key].type({}, PopulationLevel.none);
            }

            // if this type is an array note in next loop
            if (Array.isArray(model[key].type)) {
                return this.deepLoopQuery(model, keys, true);
            } else {
                return this.deepLoopQuery(model, keys);
            }
        }
    }
}

export const requestparser: Requestparser = new Requestparser();