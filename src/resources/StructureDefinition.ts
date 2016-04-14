
import {conformanceResourceStatus} from './valueSets/ConformanceResourceStatus';
import {String, Validator, ElementDefinition, Binding, BindingStrength, PopulationLevel} from 'ts-objectschema';
import {DomainResource} from './DomainResource';

// back bone element
class Snapshot extends Validator {
    public element: ElementDefinition = {
        required: false,
        search: true,
        type: String
    };

    public constructor(data: {[key: string]: any}, validate: PopulationLevel) {

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
        search: true,
        type: String
    };
    public name: ElementDefinition = {
        required: true,
        search: true,
        type: String
    };
    public version: ElementDefinition = {
        required: true,
        search: false,
        type: Number
    };
    public status: ElementDefinition = {
        binding: new Binding(BindingStrength.required, 'Description of valueset', conformanceResourceStatus),
        required: true,
        search: false,
        type: String
    };
    public snapshot: ElementDefinition = {
        binding: new Binding(BindingStrength.required, 'Description of valueset', conformanceResourceStatus),
        required: true,
        search: false,
        type: Snapshot
    };

    public constructor(data: {[key: string]: any}, validate: PopulationLevel) {

        // do validation command
        super();
        super.populate(data, validate);

    }
}
