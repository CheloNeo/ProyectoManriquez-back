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



module.exports = controller;