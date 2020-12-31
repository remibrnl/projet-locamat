require('dotenv').config()

var express = require('express')
var mysql = require('mysql')

class User {

    #id;
    #lastname;
    #firstname;
    #email;
    #role;
    #hashPasswd

    constructor(id, lastname, firstname, email, role, hashPasswd){
        this.id = id
        this.lastname = lastname
        this.firstname = firstname
        this.email = email
        this.role = role
        this.hashPasswd = hashPasswd
    }
}

function getConnection() {
    return connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'locamat'
    })
}

function findByEmail(email, callback) {

    var connection = getConnection()
    
    connection.query('SELECT * FROM userTable WHERE mail = ? ;', [email], (err, results) => {
        if(err) {
            callback(err, null)
        }
        else if (results[0] === undefined) {
            callback(null, undefined)
        }
        else {

            callback(null, new User(results[0].id, results[0].lastName, results[0].firstName, results[0].mail, results[0].isAdmin, results[0].hashedPassword))
        }

        connection.end( (err) => {
            callback(err)
        })
    })
}

function findByID(id, callback) {

    var connection = getConnection()
    
    connection.query('SELECT * FROM userTable WHERE id = ? ;', [id], (err, results) => {
        if(err) {
            callback(err, null)
        }
        else if (results[0] === undefined) {
            callback(null, undefined)
        }
        else {
            callback(null, new User(results[0].id, results[0].lastName, results[0].firstName, results[0].mail, results[0].isAdmin, results[0].hashedPassword))
        }

        connection.end( (err) => {
            callback(err)
        })
    })
}

function create(user, callback) {
    if (typeof user !== 'User') {
        callback(new Error('wrong type, need User'))
        return
    }

    var connection = getConnection()

    connection.query('INSERT INTO userTable SET ?', user, (err, results) => {
        if (err) {
            callback(err)
            return
        }
        callback(null)
    })

}

module.exports = {
    User: User,
    getConnection: getConnection,
    findByEmail: findByEmail,
    findByID: findByID,
    create: create
}