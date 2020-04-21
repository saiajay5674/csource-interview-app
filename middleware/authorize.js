const jwt = require('jsonwebtoken');

const secret = "thisisthesecretforjwt" //switch to environment variable


module.exports = function authorize(roles = []) {

    return (req, res, next) => {

        token = req.headers['authorization'].split(' ')[1];
        
        jwt.verify(token, secret, (error, user) => {
            
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(501).json({ message: 'Unauthorized' });
            }

            next();
        });

        
    }
}