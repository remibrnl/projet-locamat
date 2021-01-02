var request = require('supertest');
var server = require('../app');

describe('Pages answers', () => {
    
    /*beforeEach(function() {
        server = require("./app");
    });

    afterEach( function() {
        server.close(done);
    });
    */

    /*
    it('responds to /', (done) => {
        request(server)
        .get('/')
        .expect(200, done)
    })
    */


    it('reponds to /login', (done) => {
        request(server)
        .get('/login')
        .expect(200, done);
    })

    it('reponds to /register', (done) => {
        request(server)
        .get('/register')
        .expect(200, done);
    })
})