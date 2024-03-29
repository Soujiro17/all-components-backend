const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) =>{
    try{
        const token = req.cookies.token;

        if(!token) return res.status(401).json({status: 401, message: "Unauthorized"});
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified.user;

        next();
    }catch(err) { res.status(401).json({status: 401, message: "Unauthorized"}) }
}

module.exports = auth;