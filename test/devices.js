var assert = require('chai').assert;
//var expect = require('chai').expect;

var user = require('../db/users.js');
var getConnection = require('../db/connectionTools.js').getConnection;

// Mysql server connection object
var connection;

var dummyDevice = {
    ref: 4594132,
    name: 'iPhone 12 Pro',
    version: '2',
    pictureUrl: 'img/phones/apple-iphone12-pro.png',
    borrowerID: 21700359,
    borrowingStartDate: '',
    borrowingEndDate: ''
};

// Dummy manual insertion
function insertDummy(done) {
    connection.query('INSERT INTO userTable SET ?', dummyUser, done);
}

// Dummy manual removal
function removeDummy(done) {
    connection.query('DELETE FROM userTable WHERE id = ? ;', dummyUser.id, done);
}