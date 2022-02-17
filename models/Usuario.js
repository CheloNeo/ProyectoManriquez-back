const { Schema, model } = require("mongoose");
const UsuarioSchema = Schema({
    rut:{
        type: String,
        required: true
    },
    pass:{
        type: String
    },
});


module.exports = model('Usuario', UsuarioSchema);