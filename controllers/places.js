var base = require('../models');
var redis = require('../libs/redis');
var JSONStream = require('JSONStream');


module.exports.list = function(req, res) {
	if (!req.query.lng) return res.status(400).send('lng is missing');
	if (!req.query.lat) return res.status(400).send('lat is missing');
	var lng = req.query.lng;
	var lat = req.query.lat;
	var t1 = Date.now();
	base.Place.find({
		loc: {
			$near: {
				$geometry: {
					type: 'Point',
					coordinates: [lng, lat]
				},
				$maxDistance: 20000
			}
		}
	}, {
		_id: 1
	}).exec((err, places) => {
		var t2 = Date.now();
		if (err) return res.status(400).send(err);
		console.log({
			queryTime: t2 - t1,
			places: places.length
		});
		res.send(places);
	});
};

module.exports.redisList = function(req, res) {
	if (!req.query.lng) return res.status(400).send('lng is missing');
	if (!req.query.lat) return res.status(400).send('lat is missing');
	var lng = Number(req.query.lng);
	var lat = Number(req.query.lat);
	var t1 = Date.now();
	var options = {
		order: 'ASC',
		units: 'm',
		accurate: true,
		withDistances: false
	};
	redis.geo.nearby({
		latitude: lat,
		longitude: lng
	}, 20000, options, function(err, places) {
		var t2 = Date.now();
		if (err) return res.status(400).send(err);
		console.log({
			queryTime: t2 - t1,
			places: places.length
		});
		res.send(places);
	});
};

module.exports.streamList = function(req, res) {
	if (!req.query.lng) return res.status(400).send('lng is missing');
	if (!req.query.lat) return res.status(400).send('lat is missing');
	var lng = req.query.lng;
	var lat = req.query.lat;
	var t1 = Date.now();
	var stream = base.Place.find({
		loc: {
			$near: {
				$geometry: {
					type: 'Point',
					coordinates: [lng, lat]
				},
				$maxDistance: 20000
			}
		}
	}, {
		_id: 1
	}).stream().pipe(JSONStream.stringify()).pipe(res);
};
