const jwt = require('jsonwebtoken')
const {secretKey} = require('../config')

module.exports = (roles) => { return (req, res, next) =>{
    if(req.method === "OPTIONS"){
        next()
    }

    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(403).json({message: "User is not logged in"})
        }
        const {roles: userRoles} = jwt.verify(token, secretKey)
        console.log(roles)
        let hasRole = false
        roles.forEach(role => {
            if(userRoles == role){
                hasRole = true
            }
        })
        if(!hasRole){
            return res.status(403).json({message: "You don't have permissions"})
        } 
        next()
    }
    catch(error){
        console.log(error)
        return res.status(403).json({message: "User is not logged in"})
    }
}
}