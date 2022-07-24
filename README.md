# Fastify-Auth0-API

Hi there, 
In this app, I would like to test how to implement Auth0 API in Fastify
framework. Here's some useful scripts: 
## Available Scripts

3. Under the `server` directory, run the following commend to start the Backend App built on Fastify and MongoDB:

- `git clone https://github.com/khRasikh/fastify-mongo-auth0.git`
- `npm install`
- Create `.env` file and add the following details: 

- SERVER_PORT=4000
- MONGO_URL="<your MongoDB connection URL>" 
- REACT_APP_AUTH0_DOMAIN="<Your domain name in your react APP>"
- REACT_APP_AUTH0_CLIENT_ID="<Your client iD in your react App>"


- Make sure your MongoDB is active

### Run App

- `npm run start ` start server without using nodemon
- `npm run dev ` start server using nodemon 

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### GET Requests

- get all entities
  `curl -X 'GET' 'http://localhost:4000/auth0/public' -Header 'accept: application/json'`

- get single entity
  `curl --location --request GET 'http://localhost:4000/auth0/private' -Header content-type: application/json data '{"client_id":"YOURS","client_secret":"YOURS","audience":"YOURS","grant_type":"client_credentials"}'`

  You must see the result in the console














