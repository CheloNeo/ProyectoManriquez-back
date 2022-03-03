const { Schema, model } = require("mongoose");
const PendienteSchema = Schema({
    tipo:String,
    fecha:Date,
    observacion:String,
});


module.exports = model('Pendiente', PendienteSchema);