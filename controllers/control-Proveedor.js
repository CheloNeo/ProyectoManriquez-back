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

//modificar proveedor

controller.modificarProveedor = async (req, res)=>{
    const proveedorOriginal = await Proveedor.updateOne({_id:req.params.id},{$set:{
        nombre:req.body.nombre,
        rut: req.body.rut,
        nombreContacto: req.body.nombreContacto,
        direccion:req.body.direccion,
        telefono:req.body.telefono,
        atencion:req.body.atencion,
        correoAtencion:req.body.correoAtencion,
        retira:req.body.retira,    
    }})
    res.json({status:200, mensaje: "Cambios Realizados con exito"})
    
}
//buscar proveedor por id

controller.buscarProveedor = async (req, res)=>{
        let id= req.params.id;
        try {
        
        Proveedor.findById(id)
        .then((data)=>{
            res.json({
                status:200,
                proveedor:data
            })
        })
        .catch((err)=>{
            res.json({
                status:500,
                mensaje:"No se encuentra registrado el  proveedor"
            })
        })

    } catch (error) {
        res.json({
            status:500,
            mensaje:"Error en la BD"
        })
    }
}

module.exports = controller