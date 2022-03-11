const { Schema, model } = require("mongoose");
const GastosSchema = Schema({
    tipo:String,
    total:Number,
});


module.exports = model('Gastos', GastosSchema);