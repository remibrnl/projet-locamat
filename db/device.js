var express = require('express')
require('dotenv').config()

module.exports = {


    Device: class {

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
    }
}