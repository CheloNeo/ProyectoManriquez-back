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




module.exports = controller