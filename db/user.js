require('dotenv').config()

var express = require('express')
var mysql = require('mysql')

module.exports = {
    
    find: function (inputEmail, callback) {

        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'locamat'
          })
        
        connection.query('SELECT * FROM userTable WHERE mail = ? ', [inputEmail], (err,data) => {
        if(err) {
            callback(err, null)
        }

        if(data[0] === undefined) {
            //res.render('register',{ message: 'You have to register first' });
            callback(null, null)
        }

        let user = new user.User(data[0].id, data[0].lastname, data[0].firstname, data[0].mail, data[0].isAdmin, data[0].hashedPassword)

        callback(null, data)

        })
    },

    /*
    create: function (user, callback) {
        
        let fs = require('fs')

        fs.readFile(process.env.USERS_JSON_PATH, 'utf8', (err, data) => {
            if (err) {
                callback(err)
            }
            else {
                jsonObj = JSON.parse(data)

                // ajout du nouvel objet
                jsonObj.push(user)
                
                fs.writeFile(process.env.USERS_JSON_PATH, JSON.stringify(jsonObj), (err) => {
                    if (err) {
                        callback(err)
                    }
                    callback(null)
                })
            }
        })

        
    },*/

    User: class {

        #id;
        #lastname;
        #firstname;
        #email;
        #role;
        #hashpasswd
    
        constructor(id, lastname, firstname, email, role, hashPasswd){
            this.id = id
            this.lastname = lastname
            this.firstname = firstname
            this.email = email
            this.role = role
            this.hashPasswd = hashPasswd
        }
    }
}