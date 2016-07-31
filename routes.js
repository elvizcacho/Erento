var controllers = require('./controllers');

module.exports.init = function(app, api) {

	app.get('/places', controllers.Places.list);
	app.get('/redisPlaces', controllers.Places.redisList);
	app.get('/streamPlaces', controllers.Places.streamList);

};
