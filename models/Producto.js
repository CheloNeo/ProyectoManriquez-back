const { Schema, model } = require("mongoose");
const ProductoSchema = Schema({
    nombre: String,
    valor: Number,
    descripcion: String,
});


module.exports = model('Producto', ProductoSchema);