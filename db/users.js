require('dotenv').config();

var express = require('express');
var mysql = require('mysql');

var getConnection = require('./connectionTools.js').getConnection;

// finding

function findByEmail(email, callback) {

    var connection = getConnection();
    
    connection.query('SELECT * FROM userTable WHERE mail = ? ;', [email], (err, results) => {
        if(err) {
            callback(err);
            return;
        }
        
        if (results[0] === undefined) {
            callback(new Error('user was not found in the database'));
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

function findByID(id, callback) {

    var connection = getConnection();
    
    connection.query('SELECT * FROM userTable WHERE id = ? ;', [id], (err, results) => {
        if(err) {
            callback(err);
            return;
        }

        if (results[0] === undefined) {
            callback(new Error('user was not found in the database'));
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

// creating

function create(user, callback) {
    
    var connection = getConnection();

    connection.query('INSERT INTO userTable SET ? ;', user, (err, results) => {
        if (err) {
            callback(err);
            return;
        }
        
        connection.end(() => {
            callback();
        })
    })

}

// removing

function remove(user, callback) {
    
    var connection = getConnection();

    connection.query('DELETE FROM userTable WHERE id = ? ;', user.id, (err) => {
        if (err) {
            callback(err);
            return;
        }
        
        connection.end(() => {
            callback();
        })

    })
}

// updating

function update(user, callback) {
    
    var connection = getConnection();

    connection.query('UPDATE userTable SET ? WHERE id = ? ;', [user, user.id], (err, results) => {
        if (err) {
            callback(err);
            return;
        }

        connection.end(() => {
            callback();
        })
    })
}

module.exports = {
    getConnection: getConnection,
    findByEmail: findByEmail,
    findByID: findByID,
    create: create,
    remove: remove,
    update: update
}