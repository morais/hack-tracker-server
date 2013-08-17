# HACK TRACKER SERVER

## Dependencies

* Node.js - http://nodejs.org/download/
* MongoDB - http://www.mongodb.org/downloads

## To start Mongo DB:

    % mkdir -p ~/Documents/mongohack/
    % ./mongod --dbpath ~/Documents/mongohack/

## Running the server

Run this inside the repo to install Node.js packages:

    % npm install

To start the server, run:

    % node app

The server will be running at http://localhost:3000

## The code

All application code for the API is found in server/

The public site is served statically from client/

The hack entity supports all expected REST methods

    List: GET /hacks
    Create: POST /hacks
    Read: GET /hacks/520d17ebb8e9e6639e000001
    Update: PUT /hacks/520d17ebb8e9e6639e000001
    Delete: DELETE /hacks/520d17ebb8e9e6639e000001

CURL examples:

    % curl http://localhost:3000/hacks
    % curl --data 'title=Hack Title' http://localhost:3000/hacks
    % curl -H "X-HTTP-Method-Override: DELETE" http://localhost:3000/hacks/520d054b403bc4e49a000001
    % curl -H "X-HTTP-Method-Override: PUT" --data 'title=Updated Hack Title' http://localhost:3000/hacks/520d17ebb8e9e6639e000001
