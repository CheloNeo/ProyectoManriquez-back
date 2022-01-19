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





module.exports = controller