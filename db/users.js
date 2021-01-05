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

function findAll(callback) {

    var connection = getConnection();
    
    connection.query('SELECT * FROM userTable ;', (err, results) => {
        if(err) {
            callback(err);
            return;
        }
        
        if (results === null) {
            callback(new Error('User table is empty in the database'));
            return;
        }
        var userList = []
        for(let i = 0 ; i < results.length ; i++){
            var user = {
                id: results[i].id,
                lastName: results[i].lastName,
                firstName: results[i].firstName,
                mail: results[i].mail,
                isAdmin: results[i].isAdmin,
                hashedPassword: results[i].hashedPassword
            };
            userList.push(user)
        }
        
        
        connection.end(() => {
            callback(null, userList);
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
    findByEmail: findByEmail,
    findByID: findByID,
    findAll: findAll,
    create: create,
    remove: remove,
    update: update
}