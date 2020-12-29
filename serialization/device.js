var express = require('express');

class Device {

    #ref;
    #name;
    #version;
    #pictureName;
    #borrowerID;
    #borrowingStartDate;
    #borrowingEndDate;

    constructor(ref, name, version, pictureName, borrowerID, borrowingStartDate, borrowingEndDate) {
        this.ref = ref;
        this.name = name;
        this.version = version;
        this.pictureName = pictureName;
        this.borrowerID = borrowerID;
        this.borrowingStartDate = borrowingStartDate;
        this.borrowingEndDate = borrowingEndDate;
    }

    get ref() {
        return this.ref;
    }

    set ref(ref) {
        this.ref = ref;
    }

    get name() {
        return this.name;
    }

    set name(name) {
        this.name = name;
    }

    get version() {
        return this.version;
    }

    set version(version) {
        this.version = version;
    }

    get pictureName() {
        return this.pictureName;
    }

    set pictureName(pictureName) {
        this.pictureName = pictureName;
    }

    get borrowerID() {
        return this.borrowerID;
    }

    set borrowerID(borrowerID) {
        this.borrowerID = borrowerID;
    }

    get borrowingStartDate() {
        return this.borrowingStartDate;
    }

    set borrowingStartDate(borrowingStartDate) {
        this.borrowingStartDate = borrowingStartDate;
    }

    get borrowingEndDate() {
        return this.borrowingEndDate;
    }

    set borrowingEndDate() {
        this.borrowingEndDate = this.borrowingEndDate;
    }
}