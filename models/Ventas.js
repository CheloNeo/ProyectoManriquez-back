const { Schema, model } = require("mongoose");

const Cliente = require('./Cliente');
const Producto = require('./Producto');


// import Cliente from "../models/Cliente";

const VentaSchema = Schema({
    id_Venta: Number, //valor automatico en hora minuto segundo y fecha
    cliente: {
        nombre: String,
        apellidos: String,
        direccion: String,
        telefono: String,
        correo: String,
        rut: String,
    }, //son objectos de Cliente
    estado: String,
    productos: 
    [
        {
            nombre: String,
            valor: Number,
            descripcion: String,
            cantidad:Number,
        }
    ]
    , //son objectos de productos
    fecha: Number, //valor automatico en hora minuto segundo y fecha
    servicios: String,
    porcentaje: Number,
    totalDeVenta:Number,
    envio:String,
});



module.exports = model('Venta', VentaSchema);