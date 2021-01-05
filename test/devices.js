var assert = require('chai').assert;
//var expect = require('chai').expect;

var devices = require('../db/devices.js');
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

var dummyDevice = {
    ref: 4594132,
    name: 'iPhone 12 Pro',
    version: 2,
    pictureUrl: 'img/phones/apple-iphone12-pro.png',
    borrowerID: dummyUser.id,
    borrowingStartDate: new Date('2021-01-01 12:30:00.000000'),
    borrowingEndDate: new Date('2021-01-01 12:30:00.000000')
    //borrowingStartDate: '2021-01-01 12:30:00.000000',
    //borrowingEndDate: '2021-01-10 15:00:00.000000'
};

// Dummy device manual insertion
function insertDummyDevice(done) {
    connection.query('INSERT INTO deviceTable SET ?', dummyDevice, done);
}

// Dummy device manual removal
function removeDummyDevice(done) {
    connection.query('DELETE FROM deviceTable WHERE ref = ? ;', dummyDevice.ref, done);
}

// Dummy manual insertion
function insertDummyUser(done) {
    connection.query('INSERT INTO userTable SET ?', dummyUser, done);
}

// Dummy manual removal
function removeDummyUser(done) {
    connection.query('DELETE FROM userTable WHERE id = ? ;', dummyUser.id, done);
}

describe('db/devices.js', () => {

    // Before and after all tests : openning and closing mysql server connection
    before((done) => {
        connection = getConnection();
        insertDummyUser(done);
    });
    after((done) => {
        removeDummyUser((err) => {
            if (err) {
                done(err);
                return;
            }

            connection.end(done);
        })
    });

    describe('finding', () => {

        // Before all retrieving tests manual insertion and deletion of the dummyDevice device in the database
        before(insertDummyDevice);
        after(removeDummyDevice);


        it('findByRef()', (done) => {

            devices.findByRef(dummyDevice.ref, (err, result) => {
                
                if (err) {
                    done(err);
                    return;
                }

                try {
                    assert.deepEqual(result, dummyDevice, 'devices found is ok');
                    done();
                }
                catch (err) {
                    done(err);
                }
            });
        });

    });

    describe('creating', () => {

        // delete the normally inserted dummyDevice after each insertion tests
        // only if the test did well
        afterEach(function (done) {
            if (this.currentTest.state === 'passed') {
                removeDummyDevice(done);
            }
            else done();
        });

        it('create()', (done) => {
            
            devices.create(dummyDevice, (err, results) => {
                
                if (err) {
                    done(err);
                    return;
                }

                var ref = dummyDevice.ref

                // verifying the actual dummy for the same ID
                connection.query('SELECT * FROM deviceTable WHERE ref = ? ;', ref, (err, results) => {
                    
                    if (err) {
                        done(err);
                        return;
                    }

                    var actual = {
                        ref: results[0].ref,
                        name: results[0].name,
                        version: results[0].version,
                        pictureUrl: results[0].pictureUrl,
                        borrowerID: results[0].borrowerID,
                        borrowingStartDate: results[0].borrowingStartDate,
                        borrowingEndDate: results[0].borrowingEndDate
                    }

                    try {
                        assert.deepEqual(actual, dummyDevice, 'device inserted corresponds to expected');
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

        // Insertion of the dummy device before each removal tests
        beforeEach(insertDummyDevice);

        // Manual deletion of the dummy if test failed
        afterEach(function (done) {
            if (this.currentTest.state !== 'passed') {
                removeDummyDevice(done);
            }
            else {
                done();
            }
        })

        it('remove()', (done) => {
            devices.remove(dummyDevice, (err) => {
                if (err) {
                    done(err);
                    return;
                }

                // verifying the dummy is not longer in the database
                connection.query('SELECT * FROM deviceTable WHERE ref = ? ;', dummyDevice.ref, (err, results) => {
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
        // Insertion of the dummy device before each updating tests
        beforeEach(insertDummyDevice);
        // Deletion of the dummy after each updating tests
        afterEach(removeDummyDevice);

        it('update()', (done) => {
            updatedDummyDevice = Object.assign({}, dummyDevice);
            // Never change the ref
            updatedDummyDevice.version = 3;

            devices.update(updatedDummyDevice, (err) => {
                if (err) {
                    done(err);
                    return;
                }

                // verify the current dummy (same ref)
                connection.query('SELECT * FROM deviceTable WHERE ref = ? ;', dummyDevice.ref, (err, results) => {
                    try {
                        assert.notDeepEqual(results[0], dummyDevice, 'the device has been changed');
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