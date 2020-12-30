var express = require('express');
require('dotenv').config()

module.exports = {
    createUser: function (user, callback) {
        /*let fs = require('fs')
        let users = require('./serialization/users.json')
        
        users.push(user)

        fs.writeFile(process.env.USERS_JSON_PATH, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return console.log(err)
            }
            console.log("user created and serialized.")
        })*/

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
    },


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