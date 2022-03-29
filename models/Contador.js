const { Schema, model } = require("mongoose");
const ContadorSchema = Schema({
    NotaDeventa:Number,
    Cotizacion:Number,
});


module.exports = model('Contador',ContadorSchema);