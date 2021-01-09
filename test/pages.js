var request = require('supertest');
var server = require('../app');
var superagent = require('superagent');

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

    it('reponds to wrong url', (done) => {
        request(server)
        .get('/wrongURL')
        .expect(404, done);
    })

    it('reponds to /login with a wrong user',(done)=>{
        superagent
        .post('/login')
        .send({ mail: 'wrongmail@mail.com', password: 'password' })
        .end((err,res)=>{
            request(server)
            .get('/login')
            .expect(200,done)
        })
    })

    it('reponds to /login with a correct user',(done)=>{
        superagent
        .post('/login')
        .send({ mail: 'lewis.hamilton@mercedes.com', password: 'password1' })
        .end((err,res)=>{
            request(server)
            .get('/')
            .expect(302,done)
        })
    })

    it('responds to /adminUsers with non admin users',(done)=>{
        superagent
        .post('/login')
        .send({ mail: 'pierre.gasly@alphaTauri.com', password: 'password13' })
        .end((err,res)=>{
            request(server)
            .get('/adminUsers')
            .expect(403,done)
        })
    })

    it('responds to /adminDevices with non admin users',(done)=>{
        superagent
        .post('/login')
        .send({ mail: 'pierre.gasly@alphaTauri.com', password: 'password13' })
        .end((err,res)=>{
            request(server)
            .get('/adminDevices')
            .expect(403,done)
        })
    })
})