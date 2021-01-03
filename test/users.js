var assert = require('chai').assert;
//var expect = require('chai').expect;

var user = require('../db/users.js');
var getConnection = require('../db/connectionTools.js').getConnection;

// Mysql server connection object
var connection;

var dummyUser = {
    id: 21700359,
    lastName: 'Doe',
    firstName: 'John',
    mail: 'johndoe@mail.fr',
    isAdmin: 1,
    hashedPassword: '$2b$10$.9x25V02d./qi1q9SE3iLe1dk9ndn.7PdL2DVMVXO3TncyLeuVayi'
};

// Dummy manual insertion
function insertDummy(done) {
    connection.query('INSERT INTO userTable SET ?', dummyUser, done);
}

// Dummy manual removal
function removeDummy(done) {
    connection.query('DELETE FROM userTable WHERE id = ? ;', dummyUser.id, done);
}



describe('db/user.js', () => {

    // Before and after all tests : openning and closing mysql server connection
    before((done) => {
        connection = getConnection();
        done();
    })
    after((done) => {
        connection.end( (err) => {
            if (err) {
                done(err);
                return;
            }
            done();
        } )
    })

    describe('finding', () => {

        // Before all retrieving tests manual insertion and deletion of the dummyUser user in the database
        before(insertDummy);
        after(removeDummy);


        it('findByEmail()', (done) => {

            user.findByEmail('johndoe@mail.fr', (err, result) => {
                
                if (err) {
                    done(err);
                    return;
                }

                try {
                    assert.deepEqual(result, dummyUser, 'user found is ok')
                    done();
                }
                catch (err) {
                    done(err);
                }
            });
        });


        it('findByID()', (done) => {

            user.findByID(21700359, (err, result) => {
                
                if (err) {
                    done(err);
                    return;
                }

                try {
                    assert.deepEqual(result, dummyUser, 'user found is ok');
                    done();
                }
                catch (err) {
                    done(err);
                }
            });
        });

    });

    describe('creating', () => {

        // delete the normally inserted dummyUser after each insertion tests
        // only if the test did well
        afterEach(function (done) {
            if (this.currentTest.state === 'passed') {
                removeDummy(done);
            }
            else done();
        });

        it('create()', (done) => {
            
            user.create(dummyUser, (err, results) => {
                
                if (err) {
                    done(err);
                    return;
                }

                var id = dummyUser.id

                // verifying the actual dummy for the same ID
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

                    try {
                        assert.deepEqual(actual, dummyUser, 'user inserted corresponds to expected');
                        done();
                    }
                    catch (err) {
                        done(err);
                    }
                });

            });

        });
    });

    describe('removing', () => {

        // Insertion of the dummy user before each removal tests
        beforeEach(insertDummy);

        // Manual deletion of the dummy if test failed
        afterEach(function (done) {
            if (this.currentTest.state !== 'passed') {
                removeDummy(done);
            }
            else {
                done();
            }
        })

        it('remove()', (done) => {
            user.remove(dummyUser, (err) => {
                if (err) {
                    done(err);
                    return;
                }

                // verifying the dummy is not longer in the database
                connection.query('SELECT * FROM userTable WHERE id = ? ;', dummyUser.id, (err, results) => {
                    try {
                        assert.equal(results[0], undefined, 'the dummy is not longer in the database');
                        done();
                    }
                    catch (err) {
                        done(err);
                    }

                })

            });
        })
    })

    describe('updating', () => {
        // Insertion of the dummy user before each updating tests
        beforeEach(insertDummy);
        // Deletion of the dummy after each updating tests
        afterEach(removeDummy);

        it('update()', (done) => {
            updatedDummyUser = Object.assign({}, dummyUser);
            // Never change the id
            updatedDummyUser.isAdmin = 0;

            user.update(updatedDummyUser, (err) => {
                if (err) {
                    done(err);
                    return;
                }

                // verify the current dummy (same ID)
                connection.query('SELECT * FROM userTable WHERE id = ? ;', dummyUser.id, (err, results) => {
                    try {
                        assert.notDeepEqual(results[0], dummyUser, 'the user has been changed')
                        done();
                    }
                    catch (err) {
                        done(err);
                    }

                })
            })
        })
    })

});