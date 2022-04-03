## Search-api service

* This project developed using Node v16 and Javascript. 
* Dependencies should be installed using below command
```
npm install
```

## How to start service locally
Open terminal and go to the path of this service and then run below command 

```
npm start
```

## How to run all tests locally
Open terminal and go to the path of this service and then run below command 

```
npm run test
```

* Use POSTMAN or curl messages or any api calling tool to interact with this service locally.

## Information on exposed public APIs with Example

    * POST /search -> This api takes below properties in request payload with example values. 
        { 
	        "startDate" : "2016-01-01", 
	        "endDate": "2020-02-02", 
	        "minCount": 2704, 
	        "maxCount" : 3000
        }

    * If records found in the database using above combination then the response body example will be as below

        {
            "code": 0,
            "msg": "Success",
            "records": [
                {
                    "key": "iNAwtoZQ",
                    "createdAt": "2016-01-22T01:22:07.770Z",
                    "totalCount": 2705
                }
            ]
        }
    
    * The successful request code will be 0 else 1 on exception. 
    * "msg" property will be either with literal success or the user understandable error message.
    * records will be an array of objects or blank array.

## Validation of input request payload
* The input startDate and endDate must follow YYYY-MM-DD format for successful querying database. Also startDate must not be greater than endDate.
* minCount and maxCount should be greater than 0 and both are mandatory.
* Validation messages are easily understandable. 

## NPM packages information
* Express to create server and to use its supported features.
* Joi to validate the request payload. There are wide range of functions to validate the input properties.
* Mongodb to connect to the mongo database and use its client to query.
* Winston used for logging information or error messages in the application.
* Jest to create and run the tests.
* Supertest is an agent to test the HTTP server.

## Architecture information
* config.js is a json object with application level configuration information.
* server.js is the starting point of this node service.
* tests folder contains all the tests created in the service.
* Source code is in src folder.
* All the middleware functions of express are in middlewares folder.
* Express server is created in app.js with all middleware functions assigned to it.
* Database connection logic is placed in db-connect.js and also exposed few functions. These functions can
  be used across to query database.
* Logger function is created using winston configurations.
* Response error is a derived class of Error to override the errors occurred.
* All routes in the service is initialized in routes-init. Whenever a new module is created then it has to
  register here.
* Search is one module which consists of search specific routes, joi-schemas, handler and manager.
* Middleware functions like:
    1. error-logger is used to catch the errors occurred in the service and logs it in logger file.
    2. joi-validation validates the data against the joi schemas.
    3. response-logger logs all the http responses(both successful and unsuccessful) in logger file.
    4. set-headers sets any response headers. Here we can set or remove any other header information,

