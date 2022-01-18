const { request, response } = require("express");
const jwt = require('jsonwebtoken');





//el next es para cuando todo sale bien
const validarJWT = (req = request, resp = response, next) => {

    //para leer el header
    const token = req.header('x-token');

    //401 usuario no autenticado 
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token'
        });
    }

    try {

        //retorna el payload
        const { rut } = jwt.verify(token, process.env.SECRET_JTW_SEED);
        req.rut = rut;

    } catch (error) {
        return resp.status(401).json({
            msg: 'Token no valido'
        });
    }

    //TODO OK;
    next();


}


module.exports = {
    validarJWT
}