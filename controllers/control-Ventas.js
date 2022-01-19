let controller = {}
let Venta = require('../models/Ventas');

controller.crearVenta = (req,res)=>{
    const venta = new Venta(req.body);
    venta.id_Venta = Date.now();
    venta.fecha = Date.now();
    
    venta.save()
    .then((data)=>{
        res.json({status:200,mensaje:"Ingresado con exito"});
    })
    .catch((err)=>{
        res.json({status:500,mensaje:"Ingreso fallido revisa los campos"});
    })

}

controller.filtrarVenta = async (req, res)=>{
    await Venta.findOne({"id_Venta":req.params.id}).exec()
    .then((data)=>{
        if(data == null){
            res.json({msg: "venta no encontrada"})
        }
        res.json(data);
    }).catch((err)=>{
        res.json({msg: "ID no es numerico"})
    })
}
controller.verificarEstado = async (req, res)=>{
    await Venta.findOne({"id_Venta":req.params.id}).exec()
    .then((data)=>{
        res.json({estado:data.estado})
    }).catch((err)=>{
        res.json({msg: "Venta no encontrado"})
    })
}



module.exports = controller