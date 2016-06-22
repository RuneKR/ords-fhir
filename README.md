# Status
Work in progress. Version 1.0.0 is not done yet.

# ORDS
The point of ORDS is to leverage the gap between thought and implementation when one wants to create a [HL7 FHIR REST]( https://www.hl7.org/fhir/http.html) application.
No implementation will be the exact same and ORDS therefore support multiple ways to adapt to a specific use case via modules, [middleware](https://github.com/MedSolve/ords-fhir/wiki/Creating-middleware) and [configuration](https://github.com/MedSolve/ords-fhir/wiki/Configuration). All these possibilities of adaption allow ORDS to support multiple complex use cases and avoid rigidity for example regarding database technology and authentication providers/methods.

## Modules
Developers can create modules and publish them on npm. Actually developers might already have created modules for ORDS that helps adapt the platform and provide the functionality you need in your use case. Please see [npm](https://www.npmjs.com/browse/depended/ords-fhir).

## Middleware
A client communicates with ORDS by sending a HTTP request. ORDS utilise the [Express framework](http://expressjs.com) to handle these requests and send data back depending on the request. Between a request send and a response send back are middleware. The middleware has been split into multiple layers. Each layer presents a different part of ORDS.
There are two layers:
* Route based
* Database based
A [wiki page](https://github.com/MedSolve/ords-fhir/wiki/Creating-middleware) is created where these layers is described thoroughly. The point about these layers is that middleware can be added to run at a specific order when a request is made.

## Configuration
Minor configuration such as what port ORDS should run at and how much data a client can upload to the server can also be configured. These can be set either when ORDS is instantiated or via process variables. More can be read at the [wiki page](https://github.com/MedSolve/ords-fhir/wiki/Configuration) 

# Install
This exists as an npm module. To install in your project:
`npm install ords-fhir`

# Usage
An example repository has been created _Link to usage coming_

# Some to do
* More functionalities
* Documentation
