const { Schema, model } = require("mongoose");
const ClienteSchema = Schema({
    nombre: String,
    apellidos: String,
    direccion: String,
    telefono: String,
    correo: String,
    rut: String,
    historial:
    //historial de compras
    [
        {
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
            porcentaje: Number
        }
    ]

});


module.exports = model('Cliente', ClienteSchema);