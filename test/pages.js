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

    
    it('responds to /', (done) => {
        request(server)
        .get('/')
        .expect(302, done)
        // 302 found because it redirects to /login
    })
    
    it('responds to /adminUsers', (done) => {
        request(server)
        .get('/adminUsers')
        .expect(302, done)
        // 302 found because it redirects to /login
    })

    it('responds to /adminDevices', (done) => {
        request(server)
        .get('/adminDevices')
        .expect(302, done)
        // 302 found because it redirects to /login
    })

    it('responds to /profile', (done) => {
        request(server)
        .get('/profile')
        .expect(302, done)
        // 302 found because it redirects to /login
    })

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