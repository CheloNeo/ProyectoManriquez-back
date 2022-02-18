let controller = {};
const Categoria = require("../models/Categoria");

//crear categoria
controller.crearCategoria = (req, res) => {
    const categoria = new Categoria(req.body);
    categoria.save().then((data) => {
        res.json({
            status: 200,
            mensaje: "Categoria Creada"
        })
    })
    .catch((error)=>{
        res.json({
            status: 500,
            mensaje: "Error del sistema"
        })
    })
}

//modificar categoria
controller.modificarCategoria = async (req, res)=>{
    try {
        const categoriaOriginal = await Categoria.UpdateOne({
            _id: req.params.id,
            $set:{
                nombre: req.body.nombre
            }
        });
        res.json({
            status: 200,
            mensaje: "Actualizado con exito"
        })
    } catch (error) {
        res.json({
            status: 500,
            mensaje: "Error en el sistema"
        })
    }
}

//eliminar categoria
controller.eliminarCategoria = (req, res)=>{
    const _id = req.params.id;
    Categoria.findOneAndDelete({_id})
    .then((data)=>{
        if(data == null) {
            return res.json({
                status: 500,
                mensaje: "Categoria no encontrada"
            })
        }

        res.json({
            status:200,
            mensaje: "Categoria Eliminada"
        })
    })
    .catch((error)=>{
        res.json({
            status: 500,
            mensaje: "Error en el sistema"
        })
    })
}


controller.getCategoria = async(req,res)=>{
    await Categoria.find()
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports = controller
