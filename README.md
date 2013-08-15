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

Models are defined in models.js

Routes are defined in routes/<entity>.json

Static stuff can be dropped inside public and is mapped to the root of the server.

The hack entity supports all expected REST methods

    List: GET /hacks.json
    Create: POST /hacks.json
    Read: GET /hacks/520d17ebb8e9e6639e000001.json
    Update: PUT /hacks/520d17ebb8e9e6639e000001.json
    Delete: DELETE /hacks/520d17ebb8e9e6639e000001.json

CURL examples:

    % curl http://localhost:3000/hacks.json
    % curl --data 'title=Hack Title' http://localhost:3000/hacks.json
    % curl -H "X-HTTP-Method-Override: DELETE" http://localhost:3000/hacks/520d054b403bc4e49a000001.json
    % curl -H "X-HTTP-Method-Override: PUT" --data 'title=Updated Hack Title' http://localhost:3000/hacks/520d17ebb8e9e6639e000001.json
