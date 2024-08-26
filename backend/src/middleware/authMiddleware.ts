import { Request, Response, NextFunction } from "express"
import jwt  from 'jsonwebtoken'

    interface CustomizaRequest extends Request {    
        user?: any;
    }

export function authenticationJWT(req: CustomizaRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        return res.status(401).json({ 
            status: 401,
            name: 'Autorization Error',
            message: 'No token found'
        });
}

try {
    const verified = jwt.verify(token, 'your_secret_key');
    req.user = verified;
    next()

} catch(error) {
    return res.status(403).json({
        status: 403,
        name: 'Forbiden Error',
        message: 'Invalid token'
    })
   
}}