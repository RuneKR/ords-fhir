import {Enforce}                            from 'ts-objectschema';
import {HookManager, Hookables}             from './HookManager';
import {ResourceManager}                    from './ResourceManager';
import {DI}                                 from './DependencyInjector';
import {OperationOutcome}                   from '../models/internal/OperationOutcome';

/**
 * Base for the connection to any database
 */
@DI.createWith(ResourceManager, HookManager)
export class DBManager {
    /**
     * Reference to the resourcemanager
     */
    private rs: ResourceManager;
    /**
     * Reference to the hookmanager
     */
    private hm: HookManager;
    constructor(rs: ResourceManager, hm: HookManager) {

        // keep injected references
        this.rs = rs;
        this.hm = hm;

        // validate that model exists for all
        this.hm.addHookPre<Hookables.DBManager.Create>('DBManager.Create', '1-ords', this.validateExists);
        this.hm.addHookPre<Hookables.DBManager.Read>('DBManager.Read', '1-ords', this.validateExists);
        this.hm.addHookPre<Hookables.DBManager.Update>('DBManager.Update', '1-ords', this.validateExists);
        this.hm.addHookPre<Hookables.DBManager.Delete>('DBManager.Delete', '1-ords', this.validateExists);

        // add the actual functions
        this.hm.addHookPre<Hookables.DBManager.Create>('DBManager.Create', '2-ords', this.create);
        this.hm.addHookPre<Hookables.DBManager.Update>('DBManager.Update', '2-ords', this.update);
        this.hm.addHookPre<Hookables.DBManager.Read>('DBManager.Read', '2-ords', this.read);
    }
    /**
     * Validate that a given model exists and then go next
     * @param   {Hookables.DBManager.*}   options     options specificed for the hookmanager
     * @param   {Function}                next        next function to be called
     * @returns {Void}
     */
    public validateExists(options: any, next: Function): void {

        // validate model exsists
        if (typeof this.rs.resources[options.params.resource] === 'undefined') {
            throw new OperationOutcome({
                httpcode: 404, issue: {
                    code: 'processing.not-supported',
                    severity: 'fatal'
                }
            });
        }

        // go next function
        next();
    }
    /**
     * Validate the content of the data as if matches the schema 
     * @param {Hookables.DBManager.Create}   options     options specificed for the hookmanager
     * @param {Function}                next        next function to be called
     * @returns {Void}
     */
    public create(options: Hookables.DBManager.Create, next: Function): void {

        // check if data follows the syntax
        try {
            options.params.data = new this.rs.resources[options.params.resource](options.params.data, Enforce.required);
        } catch (err) {

            // notify about the error
            throw new OperationOutcome({
                httpcode: 400, issue: {
                    code: 'invalid.invariant',
                    diagnostics: err.message,
                    severity: 'fatal'
                }
            });
        }

        // go next
        next();
    }
    /**
     * Validate that some content is actually found
     * @param   {Hookables.DBManager.Read}   options     options specificed for the hookmanager
     * @param   {Function}                next        next function to be called
     * @returns {Void}
     */
    public read(options: Hookables.DBManager.Read, next: Function): void {

        // validate the length of outcome
        if (options.result.length === 0) {
            throw new OperationOutcome({
                httpcode: 404, issue: {
                    code: 'processing.not-found',
                    severity: 'warning'
                }
            });
        }
        
        // go next
        next();
    }
    /**
     * Validate the content of the data as if matches the schema 
     * @param   {Hookables.DBManager.Update}   options     options specificed for the hookmanager
     * @param   {Function}                     next        next function to be called
     * @returns {Void}
     */
    public update(options: Hookables.DBManager.Update, next: Function): void {

        // check if data follows the syntax
        try {
            options.params.data = new this.rs.resources[options.params.resource](options.params.data, Enforce.required);
        } catch (err) {

            // notify about the error
            throw new OperationOutcome({
                httpcode: 400, issue: {
                    code: 'invalid.invariant',
                    diagnostics: err.message,
                    severity: 'fatal'
                }
            });
        }

        // go next
        next();
    }

}
