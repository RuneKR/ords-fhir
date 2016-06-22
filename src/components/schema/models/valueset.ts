import {ElementDefinition}  from    './element-definition';
import * as Datatype        from    './data-types';
import {IValueset}          from    './i-valueset';
import {SchemaComponent}    from    '../schema.component';
import {Enforce}            from    './enforce';
import {BindingStrength}    from    './binding-strength';

class ConceptValue {
    /**
     * Name of the system
     * @type {ElementDefinition}
     */
    public code: ElementDefinition = {
        required: false,
        type: Datatype.String
    };
    /**
     * Name of the system
     * @type {ElementDefinition}
     */
    public display: ElementDefinition = {
        required: false,
        type: Datatype.String
    };
    /**
     * Defitiontion of the code
     * @type {ElementDefinition}
     */
    public definition: ElementDefinition = {
        required: false,
        type: Datatype.String
    };
    /**
     * Name of the system
     * @type {ElementDefinition}
     */
    public abstract: ElementDefinition = {
        required: false,
        type: Datatype.Boolean
    };
    /**
     * Subsystem
     * @type {ElementDefinition}
     */
    public concept: ElementDefinition = {
        required: false,
        type: [ConceptValue]
    };
    /**
     * Crease a new codeValue with data parsed to the class
     * @param {{[key: string]: any}}    data        data to be set as a valueset
     * @param {Enforce}                 validate    level of validation to be applied
     */
    public constructor(data: { [key: string]: any }, validate: Enforce) {

        // do nothing
    }
}

/**
 * System of codes that a value can have
 */
@SchemaComponent
class CodeSystem {
    /**
     * Name of the system
     * @type {ElementDefinition}
     */
    public system: ElementDefinition = {
        required: false,
        type: Datatype.String
    };
    /**
     * Version of the system
     * @type {ElementDefinition}
     */
    public version: ElementDefinition = {
        required: false,
        type: Datatype.String
    };
    /**
     * Values or codes the system can contain
     * @type {ElementDefinition}
     */
    public concept: ElementDefinition = {
        required: false,
        type: [ConceptValue]
    };
    /**
     * Crease a new codeSystem  with data parsed to the class
     * @param {{[key: string]: any}}    data        data to be set as a valueset
     * @param {Enforce}                 validate    level of validation to be applied
     */
    public constructor(data: { [key: string]: any }, validate: Enforce) {

        // do nothing
    }
}

/**
 * Valuset that a binding can be set to
 * @class Valueset
 */
@SchemaComponent
export class Valueset implements IValueset {
    /**
     * codesystem in use
     * @type {ElementDefinition}
     */
    public codeSystem: ElementDefinition = {
        required: true,
        type: CodeSystem
    };
    /**
     * Creates a new valueset with data parsed to the class
     * @param {{[key: string]: any}}    data    data to be set as a valueset
     */
    public constructor(data: { [key: string]: any }) {

        // nothing
    }
    /**
     * Validates if value is within the valueset
     * @param   {any}     value       value to be looked for in dataset
     * @returns {bolean}  the indication of the presence of that value in the dataset
     */
    public isInValueSet(value: string, strength: BindingStrength): boolean {

        // obs: Only works for codeSystem right now

        let searchPaths: Array<string> = value.split('.');

        // check every entry in the code system (THIS IS SLOW) do something better
        function recrusive(path: any): boolean {

            let needle: any = searchPaths.shift();
            let feedback: boolean = false;
            let concept: any;

            path.concept.every((data: any) => {

                // if code match and is not abstract
                if (data.code === needle && data.abstract === false) {
                    feedback = true;
                    concept = data.concept;
                    return false;
                    // else keep searching
                } else {
                    return true;
                }
            });

            // continue sub search if needed
            if (feedback === true && searchPaths.length !== 0) {

                // no more searches are possible
                if (concept === undefined) {
                    return false;
                }

                return recrusive(concept);
            }

            return feedback;
        }

        return recrusive(this.codeSystem);

    }
}
