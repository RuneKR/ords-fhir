# Status
Work in progress. Version 1.0.0 is not done yet.

# ORDS
The point of ORDS is to leverage the gap between thought and implementation when one wants to create a HL7 FHIR REST application.
No implementation will be the exact same and ORDS therefore support multiple ways to adapt to a specific use case via modules, middleware and configuration.

ORDS utilise the [Express framework](http://expressjs.com) to respond to requests by a client and provide an ordered middleware layer to ensure that a request can be controlled every step of the way to a response is send.
There are two overall middleware layers:
* Route based
* Database based

A wiki page is created where these layers is described thoroughly. The point about these layers is that a middleware for example could provide authentication/authorisation and another middleware layer could provide for example a database connection.
In that way ORDS is free of a rigidity regarding database connection and authentication provision. Developers might already have create modules to ORDS with just the functionality you need regarding the aforementioned. Pleas look at [npm](https://www.npmjs.com/browse/depended/ords-fhir).

# Usage
This exists as a plugin on npm that can be installed via:
xxx
For more information, please go to the wiki page or see the example implementation on _Link to usage coming_

# To do
* Add an error handling route for all none existing routes
* Finish functionalities
* Documentation
