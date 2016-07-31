var base = require('./models');
var async = require('async');
var redis = require('./libs/redis');
console.log('Seeding db ...');
var long1 = 12.7825927734375;
var long2 = 14.08721923828125;
var lat1 = 52.688037606833454;
var lat2 = 52.24966453484506;

var geoSquare = [ //I'll drop 100k points inside this square
	[long1, lat1],
	[long2, lat1],
	[long2, lat2],
	[long1, lat2]
];

async.waterfall([

	function(cb) {
		base.Place.remove({}, (err) => {
			redis.client.del('erento_places');
			cb(err);
		});
	},
	function(cb) {
		var count = 0;
		async.whilst(
			() => {
				return count < 100000;
			}, (cb) => {

				var longP = (long1 + Math.random() * (long2 - long1));
				var latP = (lat2 + Math.random() * (lat1 - lat2));
				base.Place.create({
					loc: {
						coordinates: [longP, latP]
					}
				}, function(err, place) {
					count++;
					redis.client.geoadd('erento_places', longP, latP, place._id.toString(), function(err, res) {
						if (err) console.error(err);
						cb(err, count);
					});
				});

			}, (err, n) => {
				console.log(n);
				cb(err);
			}
		);
	}
], function(err, places) {});
