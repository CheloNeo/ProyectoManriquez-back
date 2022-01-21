const { Schema, model } = require("mongoose");
const ClienteSchema = Schema({
    nombre: String,
    apellidos: String,
    direccion: String,
    telefono: String,
    correo: String,
    rut: String,
    
});


module.exports = model('Cliente', ClienteSchema);