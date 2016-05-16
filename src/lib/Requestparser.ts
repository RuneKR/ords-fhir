import {Enforce}                         from 'ts-objectschema';
import {Request, Response, NextFunction} from 'express';
import * as parser                       from 'body-parser';

/**
 * Toolbox for handling incomming requests
 * @class Requestparser
 */
export class Requestparser {
    /**
     * Parse the body of an request into the req.body
     * @param   {Request}   req    the express request
     * @param   {Response}  res    the express response object
     * @param   {Function}  next   next function to be run during the request
     * @returns {void}      no feedback is provided back req.body is updated
     */
    public parseBody(req: Request, res: Response, next: NextFunction): void {

        // parse application/x-www-form-urlencoded
        parser.urlencoded({
            extended: false,
            limit: process.env.LIMIT_UPLOAD_MB + 'mb'
        })(req, res, function (): void {

            // parse application/json
            parser.json({
                limit: process.env.LIMIT_UPLOAD_MB + 'mb'
            })(req, res, next);
        });
    }
    /**
     * Adds the body to the query params and generate
     * @param   {Request}   req    the express request
     * @param   {Response}  res    the express response object
     * @param   {Function}  next   next function to be run during the request
     * @returns {void}      no feedback is provided back req.query is updated
     */
     public parseQueryFromBody(req: Request, res: Response, next: NextFunction): void {
         
         // adds body to req
         req.query = req.body;
     }
    /**
     * Generate MongoDB query based on a FHIR query
     * @param   {Request}   req    the express request
     * @param   {Response}  res    the express response object
     * @param   {Function}  next   next function to be run during the request
     * @returns {void}      no feedback is provided back req.query is updated
     */
    public parseQuery(req: Request, res: Response, next: NextFunction): void {
        
      
    }
}
