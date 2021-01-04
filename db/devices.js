require('dotenv').config();

var express = require('express');
var mysql = require('mysql');

var getConnection = require('./connectionTools.js').getConnection;

// finding

function findByRef(ref, callback) {
    var connection = getConnection();
    
    connection.query('SELECT * FROM deviceTable WHERE ref = ? ;', [ref], (err, results) => {
        if(err) {
            callback(err, null);
            return;
        }
        
        if (results[0] === undefined) {
            callback(new Error('ref was not found in the database'), null);
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

// creating

function create(device, callback) {
    callback(new Error('pas encore implémentée'));
}

// removing

function remove(device, callback) {
    callback(new Error('pas encore implémentée'));
}

// updating

function update(device, callback) {
    callback(new Error('pas encore implémentée'));
}

module.exports = {
    findByRef: findByRef,
    create: create,
    remove: remove,
    update: update
}