require('dotenv').config();

var express = require('express');
var mysql = require('mysql');

var getConnection = require('./connectionTools.js').getConnection;

// finding

function findByRef(ref, callback) {
    var connection = getConnection();
    
    connection.query('SELECT * FROM deviceTable WHERE ref = ? ;', [ref], (err, results) => {
        if(err) {
            callback(err);
            return;
        }
        
        if (results[0] === undefined) {
            callback(new Error('ref was not found in the database'));
            return;
        }

        var device = {
            ref: results[0].ref,
            name: results[0].name,
            version: results[0].version,
            pictureUrl: results[0].pictureUrl,
            borrowerID: results[0].borrowerID,
            borrowingStartDate: results[0].borrowingStartDate,
            borrowingEndDate: results[0].borrowingEndDate
        };
        
        connection.end(() => {
            callback(null, device);
        });
    });
}

function findAll(callback) {
    var connection = getConnection();
    
    connection.query('SELECT * FROM deviceTable ORDER BY ref;', (err, results) => {
        if(err) {
            callback(err);
            return;
        }
        
        if (results === null) {
            callback(new Error('User table is empty in the database'));
            return;
        }
        var devicesList = results.map((element) => {
            return {
                ref: element.ref,
                name: element.name,
                version: element.version,
                pictureUrl: element.pictureUrl,
                borrowerID: element.borrowerID,
                borrowingStartDate: element.borrowingStartDate,
                borrowingEndDate: element.borrowingEndDate
            };
        })
        
        // map waits because it returns value
        
        connection.end(() => {
            callback(null, devicesList);
        });
    });
}

function findByUser(user, callback) {
    var connection = getConnection();
    
    connection.query('SELECT * FROM deviceTable where borrowerID = ? ORDER BY ref;', [user.id] , (err, results) => {
        if(err) {
            callback(err);
            return;
        }
        
        if (results === null) {
            callback(new Error('User table is empty in the database'));
            return;
        }
        var devicesList = results.map((element) => {
            return {
                ref: element.ref,
                name: element.name,
                version: element.version,
                pictureUrl: element.pictureUrl,
                borrowerID: element.borrowerID,
                borrowingStartDate: element.borrowingStartDate,
                borrowingEndDate: element.borrowingEndDate
            };
        })
        
        // map waits because it returns value
        
        connection.end(() => {
            callback(null, devicesList);
        });
    });
}

// creating

function create(device, callback) {
    var connection = getConnection();

    connection.query('INSERT INTO deviceTable SET ? ;', device, (err, results) => {
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

function remove(device, callback) {
    var connection = getConnection();

    connection.query('DELETE FROM deviceTable WHERE ref = ? ;', device.ref, (err) => {
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

function update(device, callback) {
    var connection = getConnection();

    connection.query('UPDATE deviceTable SET ? WHERE ref = ? ;', [device, device.ref], (err, results) => {
        if (err) {
            callback(err);
            return;
        }

        connection.end(() => {
            callback();
        })
    })
}

function checkValues(device, callback){
    var regexAlphaNum = /^[a-zA-Z0-9]*$/i
    if(!device.name.match(regexAlphaNum) || !device.version.match(regexAlphaNum) || !device.ref.match(regexAlphaNum)){
        callback(
            {
                error: 'content', 
                message:"Caractère interdit, n'utilisez pas de caractères spéciaux"
            })
        return 
    }
    else if((!(device.name.length <= 30) || !(device.name.length >= 1)) || (!(device.version.length <= 15) || !(device.version.length >= 3)) || !(device.length.ref == 5)){
        callback(
            {
                error: 'length', 
                message:"Taille d'un des champs incorrect"
            })
        return 
    }

    callback() 

}

module.exports = {
    findByRef: findByRef,
    findAll: findAll,
    findByUser: findByUser,
    create: create,
    remove: remove,
    update: update,
    checkValues: checkValues
}