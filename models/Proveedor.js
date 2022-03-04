const { Schema, model } = require("mongoose");
const ProveedorSchema = Schema({
    nombre: String,
    rut: String,
    nombreContacto: String,
    direccion: String,
    telefono: String,
    atencion: String,
    correoAtencion: String,
    retira: String,
    numeroGuia: String,
});


module.exports = model('Proveedor', ProveedorSchema);