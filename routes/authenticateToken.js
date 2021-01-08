var jwt = require('jsonwebtoken');

 
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
				next();
			}
		})
	}
}

module.exports = authenticateToken;