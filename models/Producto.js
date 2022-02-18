const { Schema, model } = require("mongoose");
const ProductoSchema = Schema({
    nombre: String,
    precio: Number,
    descripcion: String,
    color:String,
    stock:Number,
    categoria:String,
    imagen:String,
});


module.exports = model('Producto', ProductoSchema);