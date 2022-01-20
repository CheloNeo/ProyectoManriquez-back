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

module.exports = controller