const { response, request } = require("express");
const Tarea = require('../models/Tarea');

let controller = {}

//crear tarea
controller.addTarea = (req = request ,res = response)=>{
    //creamos la tarea
    const tarea = new Tarea(req.body)
    tarea.save()
    .then(()=>{
        res.json({status:200,mensaje:"Tarea creada"});
    })
    .catch((err)=>{
        res.json({status:500,mensaje:"Tarea no creada"});
    })
}

//modificar tarea

controller.modifyTarea = async (req = request ,res = response)=>{
    const tareaOriginal = await Tarea.updateOne({_id:req.params.id},{
        $set:{
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            fecha: req.body.fecha,
            estado: req.body.estado,
        }
    }).then((data)=>{
        res.json({
            status: 200,
            mensaje: "Cambios Realizados con exito"
        })
    })
    .catch((error)=>{
        res.json({
            status:500,
            mensaje: "Error en encontrar tarea"
        })
    })
}


//eliminar tarea
controller.deleteTarea = async (req = request , res = response)=>{
    await Tarea.findByIdAndDelete(req.params._id)
    .then(()=>{
        res.json({status:200,mensaje:"Tarea Eliminada"});
    })
    .catch((err)=>{
        res.json({status:500,mensaje:"No se elimino la cuestion!"});
    })
}

module.exports = controller;