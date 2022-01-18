let controller = {}
var bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');


controller.creacionUser = async  (req,res)=>{
    const {rut,password} = req.body;
    var user = new Usuario(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    user.save().then((data)=>{
        res.json({status:"Usuario creado con exito!"});
    },
    (err)=>{status:"usuario no creado!"})   
    

}


module.exports = controller;