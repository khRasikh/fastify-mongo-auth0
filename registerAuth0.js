module.exports = async function registerAuth0(app, opts, next) {

	app.get('/auth0/private',{preValidation: app.authenticate}, async function getusersProtected(request, reply) {
		try {
        const dataCollection = await app.mongo.db.collection("finance");
        const result = await dataCollection.find().toArray();
        return result;
      } catch (error) {
        app.log.warn("Error: "+error)
      }
	})

	app.get('/auth0/public', async function getusers(request, reply) {
      try {
        const dataCollection = await app.mongo.db.collection("finance");
        const result = await dataCollection.find().toArray();
        return result;
      } catch (error) {
        app.log.warn("Error: "+error)
      }
    }
  );
	// next
	next()
}