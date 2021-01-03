require('dotenv').config();

var express = require('express');
var mysql = require('mysql');

var getConnection = require('./connectionTools.js').getConnection;

// finding

function findByID(id, callback) {
    callback(new Error('pas encore implémentée'));
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
    getConnection: getConnection,
    findByEmail: findByEmail,
    findByID: findByID,
    create: create,
    remove: remove,
    update: update
}