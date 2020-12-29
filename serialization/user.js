var express = require('express');

class Users{

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
    
    get idd() {
        return this.#id;
    }

    set id(id) {
        this.id = id;
    }

    get lastname() {
        return this.lastname;
    }

    set lastname(lastname) {
        this.lastname = lastname;
    }

    get firstname() {
        return this.firstname;
    }

    set firstname(firstname) {
        this.firstname = firstname
    }

    get email() {
        return this.email;
    }

    set email(email) {
        this.email = email
    }

    get role() {
        return this.role;
    }

    set role(role) {
        this.role = role;
    }

    get hashPasswd() {
        return this.hashPasswd;
    }

    set hashPasswd(hashPasswd) {
        this.hashPasswd = hashPasswd;
    }
}