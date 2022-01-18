const jwt = require('jsonwebtoken');
const generarToken = ()=>{
    const payload = {
        check:  true
       };
    const token = jwt.sign(payload,process.env.SECRET_KEY);
    return {
    status:200,
    mensaje: token,
    };    
}

module.exports = {
    generarToken
}
