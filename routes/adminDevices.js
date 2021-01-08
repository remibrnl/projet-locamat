var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')

var devices = require('../db/devices.js');

//Faire router.get pour que AdminDEvices.html marche
router.get('/',authenticateToken,(req,res,next)=>{

	devices.findAll((err, result) => {
		if (err) {
			next(err);
		}
		else {
			var devicesList = result.map((element) => {
				var device = Object.assign(element);
				if ( device.borrowingStartDate !== null && device.borrowingEndDate !== null ){
					device.borrowingStartDate = element.borrowingStartDate.toLocaleString('fr-FR');
					device.borrowingEndDate = element.borrowingEndDate.toLocaleString('fr-FR');
				}
				return device;
			});
			
			res.render('adminDevices',{ title: 'Locamat : Materiel administration', user: req.user, devicesList: devicesList });
		};
	});

});

// User deletion confirmation
router.post('/deleteDevice', (req, res, next) => {
	devices.remove({ref: Object.keys(req.body)[0]}, (err) => {
		if (err) {
			next(err);
			return;
		}

		res.redirect('/adminDevices');
	});
});


router.post('/updateDevice', (req, res, next) => {
	var device = JSON.parse(Object.keys(req.body)[0]);
	console.log(req.body);

	res.redirect('/adminDevices');
});

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
	
	module.exports = router;