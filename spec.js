var request = require('supertest');
var server = require('./app');
var assert = require('assert')
var mysql = require('mysql')

// modules
var user = require('./db/user')

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
        .expect(200, done)
    })

    it('reponds to /register', (done) => {
        request(server)
        .get('/register')
        .expect(200, done)
    })
})

describe('Database access', () => {

    describe('users', () => {

        
        it('find user by email', () => {
            
            var expected = new user.User(21700359, 'Doe', 'John', 'johndoe@mail.fr', 1, '$2b$10$.9x25V02d./qi1q9SE3iLe1dk9ndn.7PdL2DVMVXO3TncyLeuVayi')
            user.findByEmail('johndoe@mail.fr', (err, result) => {
                
                assert.deepStrictEqual(result, expected)
            })
        })
        
        
        it('find user by ID', () => {
            
            var expected = new user.User(21700359, 'Doe', 'John', 'johndoe@mail.fr', 1, '$2b$10$.9x25V02d./qi1q9SE3iLe1dk9ndn.7PdL2DVMVXO3TncyLeuVayi')
            user.findByID(21700359, (err, result) => {
                
                assert.deepStrictEqual(result, expected)
            })
        })
       
        it('create user', () => {
            
            var expected = new user.User(99999999, 'Doe', 'John', 'johndoe@mail.fr', 1, '$2b$10$.9x25V02d./qi1q9SE3iLe1dk9ndn.7PdL2DVMVXO3TncyLeuVayi')
            
            user.create(expected, (err, actual) => {
                
                var connection = user.getConnection()

                connection.query('SELECT * FROM userTable WHERE id = ? ;', expected, (err, results) => {
                    
                    var actual = new user.User(results[0].id, results[0].lastName, results[0].firstName, results[0].mail, results[0].isAdmin, results[0].hashedPassword)

                    assert.deepStrictEqual(actual, expected)

                })

            })

        })

    })
})