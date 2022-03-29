const { Schema, model } = require("mongoose");
const ContadorSchema = Schema({
    NotaDeVenta:Number,
    Cotizacion:Number,
});


module.exports = model('Contador',ContadorSchema);