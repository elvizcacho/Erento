process.env.APP_ENV = 'test';
var app = require('../../server');
var request = require('supertest');
var should = require('should');



describe('places', function() {

	it('get /places', function(done) {
		this.timeout(10000);
		request(app)
			.get('/places?lng=13.1449507&lat=52.507629')
			.set('Accept', 'application/json')
			.end(function(err, res) {
				res.statusCode.should.equal(200);
				done();
			});
	});

});
