const { Schema, model } = require("mongoose");
const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    rut:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    pass:{
        type: String,
        required: true
    },
    validacion:{
        type:String
    },

});


module.exports = model('Usuario', UsuarioSchema);