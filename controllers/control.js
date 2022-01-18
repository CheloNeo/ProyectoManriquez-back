let controller = {}
var bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');


controller.creacionUser = async (req,res)=>{

    let {rut , password} = req.body;
    let newPass = "";
    bcrypt.hash(password,10,function(err,data){

        if(data){
            newPass = data;
            try {
                const Usuario = await new Usuario({rut , newPass});
                Usuario.save();
                res.json({status:"Usuario creado con exito!"});
                
            } catch (error) {
                res.json({status:"El usuario no fue creado"});
            }
        }
        else if(err){
            res.json({status:500});
        }
    })

 

}