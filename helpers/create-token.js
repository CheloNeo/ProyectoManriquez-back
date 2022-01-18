const jwt = require('jsonwebtoken');
const generarToken = ()=>{
    const payload = {
        check:  true
       };
    const token = jwt.sign(payload,process.env.SECRET_KEY, {
    expiresIn: 0
    });
    return {
    status:200,
    token: token,
    };    
}

module.exports = {
    generarToken
}
