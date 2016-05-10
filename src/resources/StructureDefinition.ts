
import {conformanceResourceStatus} from './valueSets/ConformanceResourceStatus';
import {datatypes, decorators, ElementDefinition, Binding, BindingStrength, Enforce} from 'ts-objectschema';
import {DomainResource} from './DomainResource';

// back bone element
@decorators.validate
class Snapshot {
    public element: ElementDefinition = {
        required: false,
        type: datatypes.String
    };

    public constructor(data: {[key: string]: any}, validate: Enforce) {

        // ones element is build. "Re compile" it here to fit the requirements from FHIR
    }
}

// actuall class 
class StructureDefinition extends DomainResource {
    public publisher: ElementDefinition = {
        required: false,
        type: datatypes.String
    };
    public name: ElementDefinition = {
        required: true,
        type: datatypes.String
    };
    public version: ElementDefinition = {
        required: true,
        type: datatypes.Number
    };
    public status: ElementDefinition = {
        binding: new Binding(BindingStrength.required, 'Description of valueset', conformanceResourceStatus),
        required: true,
        type: datatypes.String
    };
    public snapshot: ElementDefinition = {
        binding: new Binding(BindingStrength.required, 'Description of valueset', conformanceResourceStatus),
        required: true,
        type: Snapshot
    };

    public constructor(data: {[key: string]: any}, validate: Enforce) {

        // do validation command
        super();

    }
}
