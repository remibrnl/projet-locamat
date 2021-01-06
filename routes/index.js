require('dotenv').config();

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var users = require('../db/users.js');
var devices = require('../db/devices.js');

/* GET home page. */
router.get('/', authenticateToken, (req, res) =>{

	devices.findAll((err, result) => {
		if (err) {
			next(err);
			return;
		}
		

		var devicesList = [];
		var count = 0;
		const options = {weekdat: 'long', year: 'numeric', month: 'long', day:'numeric'};

		result.forEach((element, index, array) => {
			users.findByID(element.borrowerID, (err, borrower) => {
				if (err) {
					next(err);
					return;
				}
				devicesList.push({
					ref: element.ref,
					name: element.name,
					version: element.version,
					pictureUrl: element.pictureUrl,
					borrower: borrower,
					borrowingStartDate: element.borrowingStartDate.toLocaleString('fr-FR'), // à reformater
					borrowingEndDate: element.borrowingEndDate.toLocaleString('fr-FR') // à reformater
				});

				count++;

				if (count === array.length) {
					res.render('index', { title: 'Matériel', connectedUser: req.user, users: users, devicesList: devicesList});
				}
			});
		});
	})
	
});

// A FAIRE : Trouver un moyen de rediriger sur /login quand / donne "Unauthorized" --> fait à check ensemble 
function authenticateToken(req, res, next) {
	const cookieToken = req.cookies 
	const token = cookieToken.token
	
	if(token == null || token=="") { return res.redirect('login')} 
	else{
		jwt.verify(token.toString(), process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err){
				res.redirect('/login', {message: 'invalid token'})
			}
			
			else if (!decoded) {
				res.redirect('/login', {message: 'invalid token'})
			}
			else {
				req.user = decoded
				next()
			}
		})
	}
}

module.exports = router