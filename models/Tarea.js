const { Schema, model } = require("mongoose");
const tareaSchema = Schema({
    
    nombre : String ,
    descripcion : String , 
    fecha: Number,
    estado: String,

});


module.exports = model('Tarea', tareaSchema);