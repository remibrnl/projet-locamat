var assert = require('chai').assert;
//var expect = require('chai').expect;

var users = require('../db/users.js');
var getConnection = require('../db/connectionTools.js').getConnection;

// Mysql server connection object
var connection;

var dummyUser = {
    id: 'J217003',
    lastName: 'Doe',
    firstName: 'John',
    mail: 'johndoe@mail.fr',
    isAdmin: 1,
    hashedPassword: '$2b$10$.9x25V02d./qi1q9SE3iLe1dk9ndn.7PdL2DVMVXO3TncyLeuVayi'
};

var invalidContent = {
    id: '2170@0359',
    lastName: 'Do&e',
    firstName: 'J#ohn'
};

var invalidLength = {
    id: '217',
    lastName: 'Doeilpazertyuiopqsdfghjklmwxcvbna',
    firstName: 'Johnazertyuiopqsdfghjklmwxcvbnazert'
};

var invalidMailNoAt = 'johndoemail.fr';
var invalidMailSpace = 'johndo email.fr';

// Dummy manual insertion
function insertDummy(done) {
    connection.query('INSERT INTO userTable SET ?', dummyUser, done);
}

// Dummy manual removal
function removeDummy(done) {
    connection.query('DELETE FROM userTable WHERE id = ? ;', dummyUser.id, done);
}

function checkContent(tested, done) {
    users.checkValues(tested, (result) => {
        try {
            assert.deepEqual(result.error, 'content', 'content error detected');
            done();
        }
        catch (err) {
            done(err);
        }
    });
}

function checkLength(tested, done) {
    users.checkValues(tested, (result) => {
        try {
            assert.deepEqual(result.error, 'length', 'length error detected');
            done();
        }
        catch (err) {
            done(err);
        }
    });
}

describe('db/user.js', () => {

    // Before and after all tests : openning and closing mysql server connection
    before((done) => {
        connection = getConnection();
        done();
    });
    after((done) => {
        connection.end(done);
    });

    describe('finding', () => {

        // Before all retrieving tests manual insertion and deletion of the dummyUser user in the database
        before(insertDummy);
        after(removeDummy);


        it('findByEmail()', (done) => {

            users.findByEmail(dummyUser.mail, (err, result) => {
                
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


        it('findAll()', (done) => {
            users.findAll((err, result) => {
                if (err) {
                    done(err);
                    return;
                }

                var count = 0;

                try {
                    assert(result.some((element) => {
                        return JSON.stringify(element) === JSON.stringify(dummyUser);
                    }), 'the dummy is in the result array');
                    done();
                }
                catch (err) {
                    done(err);
                }
                
            });
        });


        it('findByID()', (done) => {

            users.findByID(dummyUser.id, (err, result) => {
                
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
            
            users.create(dummyUser, (err, results) => {
                
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
        });

        it('remove()', (done) => {
            users.remove(dummyUser, (err) => {
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

                });

            });
        });
    });

    describe('updating', () => {
        // Insertion of the dummy user before each updating tests
        beforeEach(insertDummy);
        // Deletion of the dummy after each updating tests
        afterEach(removeDummy);

        it('update()', (done) => {
            updatedDummyUser = Object.assign({}, dummyUser);
            // Never change the id
            updatedDummyUser.isAdmin = 0;

            users.update(updatedDummyUser, (err) => {
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

                });
            });
        });
    });

    describe.only('checkValues()', () => {
        it('valid user', (done) => {
            users.checkValues(dummyUser, (result) => {
                
                try {
                    assert.equal(result, undefined, 'values validated');
                    done();
                }
                catch (err) {
                    done(err);
                }
            });
        });

        describe('content', () => {
            it('id', (done) => {
                let tested = Object.assign({}, dummyUser); // valid fields

                tested.id = invalidContent.id; // invalid field

                checkContent(tested, done);
            });

            it('firstname', (done) => {
                let tested = Object.assign({}, dummyUser); // valid fields

                tested.firstName = invalidContent.firstName; // invalid field

                checkContent(tested, done);

            });

            it('lastname', (done) => {
                let tested = Object.assign({}, dummyUser); // valid fields

                tested.lastName = invalidContent.lastName; // invalid field

                checkContent(tested, done);

            });
        });

        describe('length', () => {
            it('id', (done) => {
                let tested = Object.assign({}, dummyUser); // valid fields

                tested.id = invalidLength.id; // invalid field

                checkLength(tested, done);
            });

            it('firstname', (done) => {
                let tested = Object.assign({}, dummyUser); // valid fields

                tested.firstName = invalidLength.firstName; // invalid field
                
                checkLength(tested, done);
            });

            it('lastname', (done) => {
                let tested = Object.assign({}, dummyUser); // valid fields

                tested.lastName = invalidLength.lastName; // invalid field

                checkLength(tested, done);
            });
        });

        describe('mail', () => {
            it('@ character', (done) => {
                let tested = Object.assign({}, dummyUser); // valid fields

                tested.mail = invalidMailNoAt; // invalid field

                users.checkValues(tested, (result) => {
                    try {
                        assert.deepEqual(result.error, 'content', 'mail content error detected');
                        done();
                    }
                    catch (err) {
                        done(err);
                    }
                });
            });

            it('space', (done) => {
                let tested = Object.assign({}, dummyUser); // valid fields

                tested.mail = invalidMailSpace; // invalid field

                users.checkValues(tested, (result) => {
                    try {
                        assert.deepEqual(result.error, 'content', 'mail content error detected');
                        done();
                    }
                    catch (err) {
                        done(err);
                    }
                });
            });
        });
    });

});