const { Schema, model } = require("mongoose");
const FinanzasSchema = Schema({
    
    estadoFinanciero:Number,
    ganancias:Number,
    gastos:[
        {
            tipo:String,
            total:Number,
        }
    ],
    totalGastos:Number,

});


module.exports = model('Finanzas', FinanzasSchema);