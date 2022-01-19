const { Schema, model } = require("mongoose");
const ProveedorSchema = Schema({
    nombre:String,
    direccion:String,
    fono:Number,
    atencion:String,
    detalle: String,
});


module.exports = model('Proveedor', ProveedorSchema);