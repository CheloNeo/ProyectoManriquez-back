let controller = {};
const Producto = require("../models/Producto");

//crear Producto
controller.crearProducto = (req, res) => {
    const producto = new Producto(req.body);
    producto.save().then((data) => {
        res.json({
            msg: "Producto Creado",
            status: 200
        })
    })
        .catch((error) => {
            res.json({
                msg: "Error en el Sistema",
                status: 500
            })
            console.log(error)
        })

}

//Modificar Producto

controller.modificarProducto = async (req, res) => {
    try {
        const productoOriginal = await Producto.updateOne({
            _id: req.params.id,
            $set: {
                nombre: req.body.nombre,
                valor: req.body.valor,
                descripcion: req.body.descripcion,
            }
        });
        res.json({
            msg: "Acutalizado con exito",
            status: 200
        })
    } catch (error) {
        res.json({
            msg: "Error en el sistema",
            status: 500
        })
    }

}

controller.eliminarProducto = (req, res)=>{
    const _id = req.params.id;
    Producto.findOneAndDelete({_id})
    .then((data)=>{
        if(data== null){
            return res.json({
                msg: "Producto no encontrado",
                status:500
            })
        }
        res.json({
            msg:"Producto Eliminado",
            status: 200
        })
    })
    .catch((error)=>{
        res.json({
            msg:"Error en el sistema",
            status: 500
        })
    })
}
module.exports = controller