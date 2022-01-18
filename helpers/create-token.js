const jwt = require('jsonwebtoken');
const generarToken = ()=>{
    const payload = {
        check:  true
       };
    const token = jwt.sign(payload,process.env.SECRET_KEY, {
    expiresIn: "24h"
    });
    return {
    status:200,
    token: token,
    };    
}

module.exports = {
    generarToken
}
