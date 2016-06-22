import { Promise } from 'es6-promise';
import { Request, Response } from '../routing/routing.models';
import { DatabaseMiddleware } from './database.middleware';
/**
 * Handles connection to a database by doing all middlewares
 */
export declare class DatabaseComponent {
    /**
     * Ref to database middleware
     */
    private dbm;
    /**
     * Create new instance of DBManager and bind middleware to it
     */
    constructor(dbm: DatabaseMiddleware);
    /**
     * Create something in the database
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {Promise}     send back response when all middleware has been run
     */
    create(req: Request, res: Response): Promise<any>;
    /**
     * Read something from the database
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {Promise}     send back response when all middleware has been run
     */
    read(req: Request, res: Response): Promise<any>;
    /**
     * Update something in the database
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {Promise}     send back response when all middleware has been run
     */
    update(req: Request, res: Response): Promise<any>;
    /**
     * Create something in the database
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {Promise}     send back response when all middleware has been run
     */
    delete(req: Request, res: Response): Promise<any>;
    /**
     * Read history of something in the database
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {Promise}     send back response when all middleware has been run
     */
    history(req: Request, res: Response): Promise<any>;
    /**
     * Patch something in the database
     * @param   {Request}     req     requrest from the client
     * @param   {Response}    res     response being send to the client
     * @returns {Promise}     send back response when all middleware has been run
     */
    patch(req: Request, res: Response): Promise<any>;
}
