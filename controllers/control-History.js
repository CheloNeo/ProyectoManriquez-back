const controll = {}
const { request } = require('express');
const Cliente = require('../models/Cliente');//importamos el modelo de cliente
//add venta in history of client

controll.addVenta = async (req = request ,res)=>{
    let historialAux = [];
    const rut = req.params.rut ;//recibimos el rut del cliente para poder adjuntar su nueva venta
    //buscamos al cliente
    await Cliente.findOne({rut}).exec()
    .then((data)=>{
        if(data == null){
            //la data no es valida
            return res.json({status:500,mensaje:"El usuario no se encuentra en el sistema crealo!"})
        }
        historialAux = data.historial
    })
    .catch((err)=>{
        console.log(err)
    })

    historialAux.push(req.body) //agregamos la nueva venta
    Cliente.findOneAndUpdate({"rut":rut,historial:historialAux})
    .then(()=>{
        res.json({
            status:200,
            mensaje:"HIstorial modificado"
        })
    })
    .catch((err)=>{
        res.json({
            status:500,
            mensaje:"Quedo la pura escoba!"
        })
    })

}

controll.traerHistoria = async(req=request, res)=>{
    var rut = req.params.rut
    
    try {
        await Cliente.findOne({rut}, {"historial": 1})
        .then((data)=>{

            
            res.json({
                status:200,
                cliente: data
            });
        })
            
    } catch (error) {
        console.log(error)
        res.json({
            status: 500,
            mensaje: "Hable con el administrador"
        })
    }
}

module.exports = controll