const { Schema, model } = require("mongoose");
const ProductoSchema = Schema({
    nombre: String,
    valor: Number,
    descripcion: String,
    categoria:String,
});


module.exports = model('Producto', ProductoSchema);