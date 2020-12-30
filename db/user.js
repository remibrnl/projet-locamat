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

function find(inputEmail, callback) {

    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'locamat'
      })
    
    connection.query('SELECT * FROM userTable WHERE mail = ? ', [inputEmail], (err, data) => {
        if(err) {
            callback(err, null)
        }

        else if(data[0] === undefined) {
            //res.render('register',{ message: 'You have to register first' });
            callback(null, null)
        }

        else {
            let user = new User(data[0].id, data[0].lastname, data[0].firstname, data[0].mail, data[0].isAdmin, data[0].hashedPassword)

            callback(null, user)
        }
    })
}

module.exports = {
    
    User: User,
    find: find
}