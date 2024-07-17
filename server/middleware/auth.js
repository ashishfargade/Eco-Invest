import jwt from 'jsonwebtoken'

import { jwt_secret } from '../config.js'

export function auth(req, res, next){
    const token = req.header('x-auth-token');
    
    //Check if no token
    if(!token){
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    
    //Decode token
    try {
        const decoded = jwt.verify(token, jwt_secret);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid Token' });
        // console.log(err);
        // console.log(jwtSecret);
    }
}