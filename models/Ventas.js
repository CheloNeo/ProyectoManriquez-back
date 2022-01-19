const { Schema, model } = require("mongoose");

const Cliente = require('./Cliente');
const Producto = require('./Producto');


// import Cliente from "../models/Cliente";

const VentaSchema = Schema({
    id_Venta: Date.now(), //valor automatico en hora minuto segundo y fecha
    cliente: Cliente, //son objectos de Cliente
    estado: String,
    productos: Producto, //son objectos de productos
    fecha: Date.now(), //valor automatico en hora minuto segundo y fecha
    servicios: String,
    porcentaje: Number
});


module.exports = model('Venta', VentaSchema);