let controller = {};

const Contador = require('../models/Contador');

controller.addContador = async(req,res)=>{

    const{tipo,contador} = req.body;

    if(tipo == "venta"){
        Contador.findOneAndUpdate({},{$set:{
            
        }})
    }
    else if(tipo == "cotizacion"){

    }




}





module.exports = controller