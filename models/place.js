var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Currency
var PlaceSchema = new Schema({
	loc: {
		type: {
			type: String,
			default: 'Point'
		},
		coordinates: {
			type: [Number],
			default: [0, 0]
		}
	},
	street: {
		type: String
	}
}, {
	collection: 'places'
});

PlaceSchema.index({
	'loc': '2dsphere'
});

module.exports = mongoose.model('Place', PlaceSchema);
