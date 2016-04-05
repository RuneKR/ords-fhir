
# Aim
HL7 FHIR implementation on NodeJS in typescript that can use any database backend. Example: MongoDB.

# About the project
We are a small project group studying biomedical engineering and health at Aalborg University of Denmark. Though our semester we started to develop a telemedicine health data backend with the main standard implemented being HL7 FHIR. FHIR includes different HL7 and CDA standards, but the plan is that more standards might be implemented to provide interoperability with some existing systems in both Danish and international health context.
For more information see here: [ords.io](http://ords.io). We will update that page rapidly.

# Current status
We are working to implement full HL7 FHIR REST support and auto-generate conformance from resources.
We ARE NOT in version 1 yet.

# Setting up the project
This project is a core. To use it, pleas see: [https://github.com/MedSolve/ts-ords-fhir-node.git](https://github.com/MedSolve/ts-ords-fhir-node.git).

# TODO
* Write more documentation - Always
* Implementation of OAUTH 2
* Implementation more HL7 FHIR resources
* Implement Messaged based communication
* Implement Document based communication
* Auto create conformance 
* Write tests

## Code Organization
The source is located in the `src` folder. All FHIR resources and datatypes are located in the `resources` folder. 
Feel free to add og change anything to make the resources fit your project! Routing are located in `lib/routes` and other files are included in `lib`. 

# Contribute
We are very keen to have developers contributing. Please read [this](CONTRIBUTE.MD) if you want to contribute.

# Links
* [HL7 FHIR](https://www.hl7.org/fhir/)
* [ords.io](http://ords.io)

# License
MIT