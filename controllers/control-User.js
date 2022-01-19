let controller = {}
var bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const jwt = require("jsonwebtoken");
const { generarToken } = require("../helpers/create-token");


controller.creacionUser = async  (req,res)=>{

    // se crea un nuevo usuario con rut y password, con el fin de poder hashear esa contrasena
    // y guardar el usuario con la contrasena hasheada en la bd, obviamente este no tiene que existir


    const {rut,password} = req.body;

    //buscar si el usuario esta o no en la  BD
    const usuario = await Usuario.findOne({ rut });
    if (usuario) {
        return res.json({
            status: 500, // el usuario ya existe
            mensaje:"El usuario ya existe"
        });
    }
    else{
        var user = new Usuario(req.body);//creamos un usuario nuevo
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        user.save().then((data)=>{
            res.json({status:200,mensaje:"Usuario creado"}); // el usuario es creado exitosamente!
        })
        .catch((err)=>{res.json({status:500,mensaje:"Error"})})   
    }
}




controller.login = async (req,res)=>{
    // se debe enviar un usuario buscarlo en la base de datos
    // y devolver true si esta y en caso contrario false
    const {rut,password} = req.body;
    await Usuario.findOne({rut})
    .then((data)=>{
        if(data == null){
            res.json({status:500,mensaje:"Usuario no encontrado"});
        }
        else{
            bcrypt.compare(password,data.password,function(err,result){
                
                if(result == true){
                    res.json(generarToken())
                }
                else{
                    res.json({status:500,mensaje:"Contraseña incorrecta!"});
                }
            })
        }
    })
}




controller.validateToken =  (req, res)=>{

    // este metodo esta creado para poder validar un token es decir 
    // cuando un usuario esta en la web con un token no expirado o expirado

    const {token } = req.body;
    try {
        const validation = jwt.verify(token, process.env.SECRET_KEY)
        const respuesta =  generarToken();
        res.send(respuesta);

        
    } catch (error) {
        console.log(error)
        res.json({status:500,mensaje:"Ingresa nuevamente, ingreso invalido"})
    }
}

controller.deleteUsuario = (req,res)=>{



    const rut = req.params.rut;
    Usuario.findOneAndDelete({ rut })
    .then((data)=>{
        if(data==null){
            res.json({status:500,mensaje:"Usuario no encontrado"});
        }
        else{
            res.json({status:200,mensaje:"Usuario eliminado"});
        }
    })
    .catch((err)=>{
        console.log(err)
        res.json({status:500, mensaje:"error"});
    })
}

module.exports = controller;