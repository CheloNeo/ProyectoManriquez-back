let controller={}
const Proveedor = require('../models/Proveedor');


//crear proveedor
controller.crearProveedor = (req,res)=>{
    try {
        const proveedor = new Proveedor(req.body) //creamos un nuevo proveedor
        proveedor.save() //guardamos el nuevo proveedor creado
        .then((data)=>{
            res.json({status:200,mensaje:"proveedor creado exitosamente!"});
        })
        .catch((err)=>{
            res.json({
                status:500,
                mensaje:"falla al crear el nuevo proveedor!"
            })
        })
    } catch (error) {
        res.json({
            status:500,
            mensaje:"falla al crear el nuevo proveedor!"
        })
    }
}

//eliminar proveedor
controller.eliminarProveedor = (req,res)=>{
    try {
        //eliminamos el proveedor
        Proveedor.findOneAndDelete(req.body)
        .then(()=>{
            res.json(
                {
                    status:200,
                    mensaje:"eliminado con exito!"
                }
            )
        })
        .catch((err)=>{
            res.json({
                status:500,
                mensaje:"Elminado con exito!"
            })
        })


    } catch (error) {
        res.json({
            status:500,
            mensaje:"Elminado con exito!"
        })
    }
}


//lista de proveedores
controller.ListarProveedores = (req,res)=>{
    try {
        
        Proveedor.find({})
        .then((data)=>{
            res.json({
                status:200,
                proveedores:data
            })
        })
        .catch((err)=>{
            res.json({
                status:500,
                mensaje:"No se pudo crear esta lista de proveedores"
            })
        })

    } catch (error) {
        res.json({
            status:500,
            mensaje:"No se pudo crear esta lista de proveedores"
        })
    }
}

module.exports = controller