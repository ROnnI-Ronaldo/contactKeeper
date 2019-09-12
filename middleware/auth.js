const jwt = require('jsonwebtoken');
const config = require ('config');

module.exports = (req, res, next) => {
    //get the token from the header
    const token = req.header('x-auth-token');

    //check if token exist
    if(!token) {
        return res.status(401).json({ msg: 'Token does not exist, access denied'});
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();

    }catch(err){
        res.status(400).json({msg: 'Authenticitation denied'})
    }
}