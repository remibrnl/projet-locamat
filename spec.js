var request = require('supertest');
var server = require("./app");

describe('tests pages', function () {
    
    /*beforeEach(function() {
        server = require("./app");
    });

    afterEach( function() {
        server.close(done);
    });
    */


    it('responds to /', function testSlash(done) {
        request(server)
        .get('/')
        .expect(200, done);
    });

    it('reponds to /login', function testLoginPage(done) {
        request(server)
        .get('/login')
        .expect(200, done);
    });
});