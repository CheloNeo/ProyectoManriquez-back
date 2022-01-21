const { Schema, model } = require("mongoose");
const CategoriaSchema = Schema({
    nombre: String,
});


module.exports = model('Categoria', CategoriaSchema);