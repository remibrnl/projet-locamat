var user = require('../db/user.js');
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('db/user.js', () => {


    it('find user by email', (done) => {
        
        //var expected = new user.User(21700359, 'Doe', 'John', 'johndoe@mail.fr', 1, '$2b$10$.9x25V02d./qi1q9SE3iLe1dk9ndn.7PdL2DVMVXO3TncyLeuVayi');

        var expected = {
            id: 21700359,
            lastName: 'Doe',
            firstName: 'John',
            mail: 'johndoe@mail.fr',
            isAdmin: 1,
            hashedPassword: '$2b$10$.9x25V02d./qi1q9SE3iLe1dk9ndn.7PdL2DVMVXO3TncyLeuVayi'
        };

        user.findByEmail('johndoe@mail.fr', (err, result) => {
            
            if (err) {
                done(err);
                return;
            }

            //assert(result == expected, 'user found is ok');
            //assert.strictEqual(result, expected);
            //expect(result).to.deep.equal(expected, 'user john doe is found in database');
            try {
                assert.deepEqual(result, expected, 'user found is ok')
                done();
            }
            catch (err) {
                done(err);
            }
        });
    });


    it('find user by ID', (done) => {
        
        var expected = {
            id: 21700359,
            lastName: 'Doe',
            firstName: 'John',
            mail: 'johndoe@mail.fr',
            isAdmin: 1,
            hashedPassword: '$2b$10$.9x25V02d./qi1q9SE3iLe1dk9ndn.7PdL2DVMVXO3TncyLeuVayi'
        };

        user.findByID(21700359, (err, result) => {
            
            if (err) {
                done(err);
                return;
            }

            //assert(result == expected, 'user found is ok');
            //assert.strictEqual(result, expected);
            //expect(result).to.deep.equal(expected, 'user john doe is found in database');
            try {
                assert.deepEqual(result, expected, 'user found is ok');
                done();
            }
            catch (err) {
                done(err);
            }
        });
    });

    it('create user', (done) => {
        
        var expected = {
            id: 9999,
            lastName: 'Doe9999',
            firstName: 'John9999',
            mail: 'johndoe9999@mail.fr',
            isAdmin: 1,
            hashedPassword: '$2b$10$.9x25V02d./qi1q9SE3iLe1dk9ndn.7PdL2DVMVXO3TncyLeuVayi'
        };
        
        user.create(expected, (err, results) => {
            
            if (err) {
                done(err);
                return;
            }

            var connection = user.getConnection();

            var id = expected.id

            connection.query('SELECT * FROM userTable WHERE id = ? ;', id, (err, results) => {
                
                if (err) {
                    done(err);
                    return;
                }

                var actual = {
                    id: results[0].id,
                    lastName: results[0].lastName,
                    firstName: results[0].firstName,
                    mail: results[0].mail,
                    isAdmin: results[0].isAdmin,
                    hashedPassword: results[0].hashedPassword
                }

                //assert(actual == expected, 'user inserted corresponds to expected');
                //assert.strictEqual(actual, expected);
                //expect(actual).to.deep.equal(expected);
                try {
                    assert.deepEqual(actual, expected, 'user inserted corresponds to expected');
                    done();
                }
                catch (err) {
                    done(err);
                }
            });

        });

    });

});