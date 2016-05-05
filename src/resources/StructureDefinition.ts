
import {conformanceResourceStatus} from './valueSets/ConformanceResourceStatus';
import {String, Validator, ElementDefinition, Binding, BindingStrength, enforce} from 'ts-objectschema';
import {DomainResource} from './DomainResource';

// back bone element
class Snapshot extends Validator {
    public element: ElementDefinition = {
        required: false,
        type: String
    };

    public constructor(data: {[key: string]: any}, validate: enforce) {

        // do validation command
        super();
        super.populate(data, validate);

        // ones element is build. "Re compile" it here to fit the requirements from FHIR
    }
}

// actuall class 
class StructureDefinition extends DomainResource {
    public publisher: ElementDefinition = {
        required: false,
        type: String
    };
    public name: ElementDefinition = {
        required: true,
        type: String
    };
    public version: ElementDefinition = {
        required: true,
        type: Number
    };
    public status: ElementDefinition = {
        binding: new Binding(BindingStrength.required, 'Description of valueset', conformanceResourceStatus),
        required: true,
        type: String
    };
    public snapshot: ElementDefinition = {
        binding: new Binding(BindingStrength.required, 'Description of valueset', conformanceResourceStatus),
        required: true,
        type: Snapshot
    };

    public constructor(data: {[key: string]: any}, validate: enforce) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
