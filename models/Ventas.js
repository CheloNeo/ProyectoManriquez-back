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
    proveedor: {
        nombre: String,
        rut: String,
        nombreContacto: String,
        direccion: String,
        telefono: String,
        atencion: String,
        correoAtencion: String,
        retira: String,
    },
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
    servicios:[
        {
            nombre:String,
            valor:Number,
        }
    ],
    fecha: Number, //valor automatico en hora minuto segundo y fecha
    porcentaje: Number,
    totalDeVenta:Number,
    abono:Number,
    envio:String,
    comentario:String
    
});



module.exports = model('Venta', VentaSchema);