
# ords-fhir
HL7 FHIR implementation on NodeJS with freely chosen data backend written in typescript

# Aim 
The first aim of this project is to implement the HL7 FHIR standard on Node.js, MongoDB and AWS S3.
Secondly the project should be free of data backend but the first implementation will be in MongoDB and AWS S3.

# About the project
We are a small project group studying biomedical engineering and health at Aalborg University of Denmark. Though our semester we started to develop a telemedicine health data backend with the main standard implemented being HL7 FHIR. FHIR includes different HL7 and CDA standards, but the plan is that more standards might be implemented to provide interoperability with some existing systems in both Danish and international health context.
MongoDB is used for document storage and attachments (large files) are stored in Amazon S3. 
For more information see here: [ords.io](http://ords.io). We update that page rapidly.

# Current status
Currently we are working to implement full HL7 FHIR REST support and auto-generate conformance from resources.
There are already implemented some REST support and some resources.

# Setting up the project
This project is a core. To use it, pleas see: Comming

# TODO
* Implementation of OAUTH 2
* Implementation more HL7 FHIR resources
* Implement Messaged based communication
* Implement Document based communication
* Auto create conformance 
* Write tests

## Code Organization
The source is located in the `src` folder. All FHIR resources and datatypes are located in the `resources` folder. 
Feel free to add og change anything to make the resources fit your project! Routing are located in `lib/routes` and other logic files are included in `lib`. 

# Contribute
We are very keen to have developers contributing. Please read [this](CONTRIBUTE.MD) if you want to contribute.

# Links
* [HL7 FHIR](https://www.hl7.org/fhir/)
* [ords.io](http://ords.io)

# License
MIT