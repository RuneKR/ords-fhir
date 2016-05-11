# Aim
Modular HL7 FHIR implementation on NodeJS written in typescript that can support multiple telemedicine use cases and use any database backend (for example MongoDB).

# About the project
We are a small project group studying biomedical engineering and health at Aalborg University of Denmark. In our semester 8th semester we started to develop this project based on the HL7 FHIR standard. The project is based on the need for a platform standard for Danish and international telemedicine projects that can support multiple and varying use cases. FHIR includes different HL7 and CDA standards, but additional standards and functionalities might be implemented as the project evolves. This could for example allow for better interoperability with some existing health systems in both Danish and international context. 

# Current status
We are working to implement full HL7 FHIR REST support and auto-generate conformance from resources. We ARE NOT in version 1 yet.

# Using this project
This project is a core and cannot be used alone as it depends on some modules. This project exsists as a npm module. Do `npm install ords-fhir --save` to use. For a full example on how to use the module, pleas see the [example project](https://github.com/MedSolve/ords-demo). You are very welcome to add to or modify this project to make this project fit your project.

# Learn more	
Pleas see our [wiki page](https://github.com/MedSolve/ords-fhir/wiki) for information on this project and how to contact us. For information about contributing see below. You can also open an issue here on GitHub if you have any questions. 

# Contribute
We are very keen to have developers contributing. Please read [the guidelines for contribution](https://github.com/MedSolve/ords-fhir/wiki/Contribute) if you want to contribute.

# Links
* [HL7 FHIR](https://www.hl7.org/fhir/)
* [ords.io](http://ords.io)
* [Demo project](https://github.com/MedSolve/ords-demo)

# License
MIT