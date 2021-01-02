require('dotenv').config();

var express = require('express');
var mysql = require('mysql');

function getConnection() {
    return connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'locamat'
        })
}

function findByEmail(email, callback) {

    var connection = getConnection();
    
    connection.query('SELECT * FROM userTable WHERE mail = ? ;', [email], (err, results) => {
        if(err) {
            callback(err, null);
            return;
        }
        
        if (results[0] === undefined) {
            callback(new Error('user not found in database'), null);
            return;
        }

        var user = {
            id: results[0].id,
            lastName: results[0].lastName,
            firstName: results[0].firstName,
            mail: results[0].mail,
            isAdmin: results[0].isAdmin,
            hashedPassword: results[0].hashedPassword
        };
        
        connection.end(() => {
            callback(null, user);
        });
    })
}

function findByID(id, callback) {

    var connection = getConnection();
    
    connection.query('SELECT * FROM userTable WHERE id = ? ;', [id], (err, results) => {
        if(err) {
            callback(err, null);
            return;
        }

        if (results[0] === undefined) {
            callback(new Error('user not found in database'), null);
            return;
        }

        var user = {
            id: results[0].id,
            lastName: results[0].lastName,
            firstName: results[0].firstName,
            mail: results[0].mail,
            isAdmin: results[0].isAdmin,
            hashedPassword: results[0].hashedPassword
        };

        connection.end(() => {
            callback(null, user);
        });
    });
}

function create(user, callback) {
    
    var connection = getConnection();

    connection.query('INSERT INTO userTable SET ?', user, (err, results) => {
        if (err) {
            callback(err);
            return;
        }
        
        connection.end(() => {
            callback(null);
        })
    })

}

module.exports = {
    getConnection: getConnection,
    findByEmail: findByEmail,
    findByID: findByID,
    create: create
}