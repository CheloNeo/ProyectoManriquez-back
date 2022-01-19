const { Schema, model } = require("mongoose");
const OrdenSchema = Schema({
    numero:Number,
    proveedor: {
        nombre:String,
        direccion:String,
        fono:Number,
        atencion:String,
        detalle: String,
    },
    detalle: String,
    quienRetira: String,
    fecha: Number,
    numeroGuia: Number,
});


module.exports = model('Orden', OrdenSchema);