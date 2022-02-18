const { Schema, model } = require("mongoose");
const ProductoSchema = Schema({
    nombre: String,
    valor: Number,
    descripcion: String,
    categoria:String,
    stock:Number,
    vecesComprado:Number,
    color:String,
    imagen:String,
});


module.exports = model('Producto', ProductoSchema);