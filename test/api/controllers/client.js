var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('add_client', function() {

    describe('POST /api/shield/client', function() {

      it('should accept a client id parameter', function(done) {

        request(server)
          .post('/api/shield/client')
          .body({
              "client_id": 1,
              "name": "arnold",
              "address": "hem"
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql('');

            done();
          });
      });

    });

  });

});
