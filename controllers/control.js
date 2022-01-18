let controller = {}
var bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const jwt = require("jsonwebtoken");

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
        },
        (err)=>{res.json({status:"usuario no creado!"})})   
    }
}

controller.login = async (req,res)=>{
    // se debe enviar un usuario buscarlo en la base de datos
    // y devolver true si esta y en caso contrario false
    const {rut,password} = req.body;
    Usuario.findOne({rut})
    .then((data)=>{
        bcrypt.compare(password,data.password,function(err,result){
            if(result == true){
                const payload = {
                    check:  true
                   };
                 const token = jwt.sign(payload,process.env.SECRET_KEY, {
                    expiresIn: 1440
                   });
                   return res.json({
                    status:200,
                    token: token,
                });
            }
            else{
                res.json({status:500})
            }
        })
    })
}

controller.validateToke = async(req, res)=>{
    const { rut, password } = req.body;
    //genera jwt y asi generar otro y validar
    const token = await generarJWT(rut);

    return res.json({
        rut,
        token
    });
}

module.exports = controller;