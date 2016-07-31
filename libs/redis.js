var redis = require("redis"),
	client = redis.createClient(),
	geo = require('georedis').initialize(client, {
		zset: 'erento_places',
		nativeGeo: true
	});


client.on("error", function(err) {
	console.log("Error " + err);
});



module.exports = {
	client: client,
	geo: geo
};
