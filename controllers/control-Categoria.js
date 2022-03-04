let controller = {};
const Categoria = require("../models/Categoria");
const Producto = require("../models/Producto");

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
controller.modifyCategory = async(req,res)=>{
    const{value,newName}=req.body;

    await Categoria.findById(value)
    .then((data)=>{
        var nombreReal = data.nombre;
        Categoria.findOneAndUpdate({_id:value},{$set:{nombre:newName}})
        .then(()=>{
            Producto.updateMany({categoria:nombreReal},{$set:{categoria:newName}})
            .then((data)=>{
                res.json({status:200,mensaje:"Actualizacion correcta!"})
            })
            .catch((err)=>{
                res.json({status:500,mensaje:"Actualizacion incorrecta!"})
            })
        })
        .catch((err)=>{
            res.json({status:500,mensaje:"Actualizacion incorrecta!"})
        })
    })
    .catch((err)=>{
        res.json({status:500,mensaje:"Actualizacion incorrecta!"})
    })

    
}


module.exports = controller
