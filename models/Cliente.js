const { Schema, model } = require("mongoose");
const ClienteSchema = Schema({
    nombre: String,
    direccion: String,
    telefono: String,
    correo: String,
    rut: String,
    totalDeCompra:Number,
    historial:
    //historial de compras
    [
        {
            id_Venta: Number, //valor automatico en hora minuto segundo y fecha
            cliente: {
                nombre: String,
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
                }
            ]
            , //son objectos de productos
            fecha: Number, //valor automatico en hora minuto segundo y fecha
            servicios: String,
            porcentaje: Number
        }
    ]

});


module.exports = model('Cliente', ClienteSchema);