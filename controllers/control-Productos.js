let controller = {};
const Producto = require("../models/Producto");

//crear Producto
controller.crearProducto = (req, res) => {
    const producto = new Producto(req.body);//creamos un nuevo producto
    producto.save().then((data) => {//lo guardamos en la bd
        res.json({//respondemos correctamente
            status:200,
            mensaje:"Producto Creado"
        })
    })
        .catch((error) => {
            res.json({//informamos de errores
                status: 500,
                mensaje: "Error en el Sistema"
                
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
                precio: req.body.valor,
                descripcion: req.body.descripcion,
                color: req.body.color,
                stock: req.body.stock,
                categoria: req.body.categoria,
                imagen: req.body.imagen
            }
        });
        res.json({
            status: 200,
            mensaje: "Acutalizado con exito"
            
        })
    } catch (error) {
        res.json({
            status: 500,
            mensaje: "Error en el sistema"
            
        })
    }

}

//eliminar productos
controller.eliminarProducto = (req, res)=>{
    const _id = req.params.id;
    Producto.findOneAndDelete({_id})
    .then((data)=>{
        if(data== null){
            return res.json({
                status:500,
                mensaje: "Producto no encontrado"
            })
        }
        res.json({
            status: 200,
            mensaje:"Producto Eliminado"
        })
    })
    .catch((error)=>{
        res.json({
            status: 500,
            mensaje:"Error en el sistema"
        })
    })
}
module.exports = controller