let controller = {}
const Orden = require('../models/OrdenDeVenta');
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

controller.crearOrden = (req,res)=>{
    //crearemos la oden de compra
    try {
        const orden = new Orden(req.body);
        orden.save()
        .then((data)=>{
            res.json({status:200,mensaje:"Orden  guardada de manera exitosa!"});
        })
        .catch((err)=>{
            res.json({status:500,mensaje:"Orden fallida!"});
        })
    } catch (error) {
        res.json({status:500,mensaje:"Creacion de orden fallida!"});
    }

}

controller.filtrarVenta = async (req, res)=>{
    await Venta.findOne({"id_Venta":req.params.id}).exec()
    .then((data)=>{
        if(data == null){
            res.json({msg: "venta no encontrada"})
        }
        res.json(data);
    }).catch((err)=>{
        res.json({msg: "Id no es numerico"})
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

controller.getVenta = async (req,res)=>{
    try {
        await Venta.find({},{fecha:1,totalDeVenta:1})
        .then((data)=>{
            res.json({status:200,data:data})
        })
    } catch (error) {
        console.log(error)
    }
}



module.exports = controller