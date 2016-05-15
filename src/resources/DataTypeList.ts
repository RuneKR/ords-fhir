// list all datatypes that are activly used
import {datatypes}                from 'ts-objectschema';   // import all from this module

// this looks strange acording to linting but have too
export let Boolean:     any = datatypes.Boolean;
export let Code:        any = datatypes.Code;
export let DateTime:    any = datatypes.DateTime;
export let Id:          any = datatypes.Id;
export let Instant:     any = datatypes.Instant;
export let Number:      any = datatypes.Number;
export let String:      any = datatypes.String;
export let Uri:         any = datatypes.Uri;

export {Address}                  from './dataTypes/Address';
export {CodeableConcept}          from './dataTypes/CodeableConcept';
export {Coding}                   from './dataTypes/Coding';
export {ContactPoint}             from './dataTypes/ContactPoint';
export {HumanName}                from './dataTypes/HumanName';
export {Identifier}               from './dataTypes/Identifier';
export {Meta}                     from './dataTypes/Meta';
export {Period}                   from './dataTypes/Period';
export {Reference}                from './dataTypes/Reference';