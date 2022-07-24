
const jwt = require("@fastify/jwt");
const { ObjectId } = require("@fastify/mongodb");
const boom = require("boom"); //handle errors
require("dotenv").config();

module.exports = function verify(app, opts, next) {
  app.post("/api/auth/generate-access-token", async (req, replay) => {
    //see "data" practice below
    try {
      const { username, email, password } = req.body;
      const token = app.jwt.sign(
        { username, email, password },
        { expiresIn: 86400 }
      );
      replay.send({ token, email });
    } catch (error) {
      throw boom.boomify(error);
    }
  });
  //verification
  app.get("/api/auth/verify", async (req, replay) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { payload } = app.jwt.verify(token);
      // const users = await app.mongo.db
      //   .collection("jwts")
      //   .find({
      //     _id: ObjectId("62d56d6094c9f1221a30c97b"),
      //   })
      //   .toArray();
      const decodedToken = app.jwt.decode(token);
      app.log.warn("This token " + token + " is succesfully verified!");
      replay.send({
        success: true,
        token: token,
        payload: payload,
        decodedToken: decodedToken,
      });
    } catch (error) {
      throw boom.boomify(error);
    }
  });
  //keep alive
  next();
};
/**Data Practice 1 */
/*1. Insert data:
url: http://localhost:4000/api/auth/generateAccessToken
Method: POST
{
    "username": "rasikh",
    "email": "kh.rasikh542@gmail.com",
    "password": "rasik1h23"

}
2. Get the result
result: 
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhc2lraCIsImVtYWlsIjoia2gucmFzaWtoNTQyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoicmFzaWsxaDIzIiwiaWF0IjoxNjU4Mzg1Njk1LCJleHAiOjE2NTg0NzIwOTV9.VusEFaCzOVLOHuvkVk676PJSPqoq_IzTmwuThqbP3_w",
    "email": "kh.rasikh542@gmail.com"
}
*/

// Verification of my Token
/*
URL: 
Method: GET
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhc2lraCIsImVtYWlsIjoia2gucmFzaWtoNTQyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoicmFzaWsxaDIzIiwiaWF0IjoxNjU4Mzg1Njk1LCJleHAiOjE2NTg0NzIwOTV9.VusEFaCzOVLOHuvkVk676PJSPqoq_IzTmwuThqbP3_w

result will be: 
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhc2lraCIsImVtYWlsIjoia2gucmFzaWtoNTQyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoicmFzaWsxaDIzIiwiaWF0IjoxNjU4Mzg1Njk1LCJleHAiOjE2NTg0NzIwOTV9.VusEFaCzOVLOHuvkVk676PJSPqoq_IzTmwuThqbP3_w",
    "decodedToken": {
        "username": "rasikh",
        "email": "kh.rasikh542@gmail.com",
        "password": "rasik1h23",
        "iat": 1658385695,
        "exp": 1658472095
    }
}
*/
