const { Schema, model } = require("mongoose");
const ClienteSchema = Schema({
    nombre: String,
    direccion: String,
    comuna: String,
    ciudad: String,
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
                comuna: String,
                ciudad: String,
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
            ,
            servicios:[
                {
                    nombre:String,
                    valor:Number,
                }
            ], //son objectos de productos
            fecha: Number, //valor automatico en hora minuto segundo y fecha
            porcentaje: Number,
            totalDeVenta:Number,
            envio:String,
        }
    ]

});


module.exports = model('Cliente', ClienteSchema);