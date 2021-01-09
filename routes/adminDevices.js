var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken');

var devices = require('../db/devices.js');
var authenticateToken = require('../routes/authenticateToken.js');

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

router.post('/deleteDevice', (req, res, next) => {
	devices.findByRef(req.body.deviceRef,(err,result)=>{
		if(err){
			next(err)
			return
		}
		devices.remove(result,(err,result)=>{
			if(err){
				next(err)
				return
			}
			res.redirect('/adminDevices')
		})	
	})
});


router.post('/updateDevice', (req, res, next) => {
	devices.findByRef(req.body.deviceRef,(err,result)=>{
		if(err){
			next(err)
			return 
		}
		var test = {
			name: req.body.name,
			version: req.body.version
		}
		updateDevice = {
			ref: result.ref,
            name: req.body.name,
            version: req.body.version,
            pictureUrl: result.pictureUrl,
            borrowerID: result.borrowerID,
            borrowingStartDate: result.borrowingStartDate,
            borrowingEndDate: result.borrowingEndDate
		}

		devices.update(updateDevice,(err,result)=>{
			if(err){
				next(err)
				return
			}
			res.redirect('/adminDevices');
		})
	})
});

module.exports = router;