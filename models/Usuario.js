const { Schema, model } = require("mongoose");
const UsuarioSchema = Schema({
    rut:{
        type: String,
        required: true
    },
    password:{
        type: String
    },
});


module.exports = model('Usuario', UsuarioSchema);