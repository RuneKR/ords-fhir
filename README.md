# Aim
HL7 FHIR implementation on NodeJS in typescript that can support multiple telemedicin use cases and use any database backend (for example MongoDB).

# About the project
We are a small project group studying biomedical engineering and health at Aalborg University of Denmark. Though our semester we started to develop a telemedicine health data backend with the main standard implemented being HL7 FHIR. FHIR includes different HL7 and CDA standards, but the plan is that more standards might be implemented to provide interoperability with some existing systems in both Danish and international health context. This will only be done as the community requires it.
Pleas see our [wiki page](https://github.com/MedSolve/ords-fhir/wiki) for more information.

# Current status
We are working to implement full HL7 FHIR REST support and auto-generate conformance from resources.
We ARE NOT in version 1 yet.

# Setting up the project
This project is a core and cannot be used alone. To use it, pleas see the [example project](https://github.com/MedSolve/ts-ords-fhir-node.git).

# Code Organization
The source is located in the `src` folder and builded code in `dist` folder. All FHIR resources and datatypes are located in the `resources` folder. 
Feel free to add og change anything to make the resources fit your project! Routing are located in `lib/routes` and other files are included in `lib`. 

# Contribute
We are very keen to have developers contributing. Please read [the guidelines for contribution](CONTRIBUTE.MD) if you want to contribute.

# Links
* [HL7 FHIR](https://www.hl7.org/fhir/)
* [ords.io](http://ords.io)
* [Example project](https://github.com/MedSolve/ts-ords-fhir-node.git)

# License
MIT