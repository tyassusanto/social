const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }else{
        return next(res.status(403).json('Server Need Token'))
    }
    try {
        const secretKey = process.env.SECRET_KEY_JWT
        const decode = jwt.verify(token, secretKey)
        // console.log("decode", decode)
        next()
    } catch (err) {
        console.log('error', err)    
        return next(res.status(400).json('Invalid Token'))
    }
}

module.exports = {
    protect
}