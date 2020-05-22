
const jwt = require('jsonwebtoken');
const texts = require('../constants/texts');
const JWT_KEY = texts.JWTKEY.key;

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded =jwt.verify(token, JWT_KEY);
        req.userData = decoded;
        console.log( req.userData);
        next();
    }catch(error){
        return res.json({
            message: error.message
        });
    }
}