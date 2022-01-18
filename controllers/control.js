let controller = {}
var bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const jwt = require("jsonwebtoken");
const { generarToken } = require("../helpers/create-token");


controller.creacionUser = async  (req,res)=>{
    const {rut,password} = req.body;

    //buscar si el usuario esta o no en la  BD
    const usuario = await Usuario.findOne({ rut });
    if (usuario) {
        return res.status(400).json({
            status: 500 // el usuario ya existe
        });
    }
    else{
        var user = new Usuario(req.body);//creamos un usuario nuevo
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        user.save().then((data)=>{
            res.json({status:200}); // el usuario es creado exitosamente!
        })
        .catch((err)=>{res.json({status:"usuario no creado!"})})   
    }
}


controller.login = async (req,res)=>{
    // se debe enviar un usuario buscarlo en la base de datos
    // y devolver true si esta y en caso contrario false
    const {rut,password} = req.body;
    await Usuario.findOne({rut})
    .then((data)=>{
        // if(data == null){
        //     res.json({status:500});
        // }
        bcrypt.compare(password,data.password,function(err,result){
            if(result == true){
                res.json(generarToken())
            }
            else{
                res.json({status:500});
            }
        })
    })
}




controller.validateToken =  (req, res)=>{


    const {token } = req.body;
    try {
        const validation = jwt.verify(token, process.env.SECRET_KEY)
        const respuesta =  generarToken();
        res.send(respuesta);

        
    } catch (error) {
        console.log(error)
        res.json({status:500})
    }
}

controller.deleteUsuario = (req,res)=>{
    const rut = req.params.rut;
    Usuario.deleteOne({ rut })
    .then(()=>{
        res.json({status:200});
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = controller;