let controller = {}

let Gasto = require('../models/Gastos');
let Finanzas = require('../models/Finanzas');
let Venta = require('../models/Ventas')

controller.addFinanza = async (req,res)=>{
    const newFinanza = new Finanzas({
        estadoFinanciero:0,
        ganancias:0,
        gastos:[],
        totalGastos:0,
    })
    newFinanza.save()
    .then(()=>{
        res.json({status:200,mensaje:"Ingreso de finanza exitoso"})
    })
}


controller.addGanancia = async (req,res)=>{
    const{id} = req.body

    await Venta.findById(id)
    .then((venta)=>{
        var suma = 0;
        venta.productos.forEach((producto)=>{ 
            //recorremos sus productos y añadimos a la suma total
            suma = suma + producto.cantidad * producto.valor
        })
        venta.servicios.forEach((service)=>{
            //recorremos los valores de servicio y añadimos a la suma total
            suma = suma + service.valor;
        })
        //truncar la suma total a un numero entero!
        suma = Math.trunc((suma*venta.porcentaje)/100);
        
        var valorAgregar = Math.trunc(suma)
        Finanzas.findOne({})
        .then((finanza)=>{
            var ganancias = finanza.ganancias
            ganancias = ganancias + valorAgregar
            Finanzas.findByIdAndUpdate(finanza._id,{$set:{ganancias:ganancias}})
            .then(()=>{
                res.json({status:200,mensaje:"Ganancia actualizada"})
            })
        })
    })


}


controller.removeGanancia = async (req,res)=>{
    const{id} = req.body
    await Venta.findById(id)
    .then((venta)=>{
        var suma = 0;
        venta.productos.forEach((producto)=>{ 
            //recorremos sus productos y añadimos a la suma total
            suma = suma + producto.cantidad * producto.valor
        })
        venta.servicios.forEach((service)=>{
            //recorremos los valores de servicio y añadimos a la suma total
            suma = suma + service.valor;
        })
        //truncar la suma total a un numero entero!
        suma = Math.trunc((suma*venta.porcentaje)/100);
        
        var valorRemove = Math.trunc(suma);
        Finanzas.findOne({})
        .then((finanza)=>{
            var ganancias = finanza.ganancias
            ganancias = ganancias - valorRemove
            Finanzas.findByIdAndUpdate(finanza._id,{$set:{ganancias:ganancias}})
            .then(()=>{
                res.json({status:200,mensaje:"Ganancia actualizada"})
            })
        })
        
    })


}


controller.addGasto = async (req,res)=>{
    const{tipo,total} = req.body;

    //primero guardamos este gasto!
    const gasto = new Gasto({tipo,total})

    gasto.save()
    .then(()=>{
        
        Finanzas.findOne({})
        .then((finanza)=>{
            var array_gastos = finanza.gastos
            var gasto = finanza.totalGastos
            gasto = gasto + total
            array_gastos.push(gasto)
            Finanzas.findByIdAndUpdate(finanza._id,{$set:{gastos:array_gastos,totalGastos:gasto}})
            .then(()=>{
                res.json({status:200,mensaje:"Ingreso correcto!"})
            })
            .catch((err)=>{
               
            })
        })
        .catch((err)=>{
         
        })
        
    })
    .catch((err)=>{
       
    })
}

controller.getFinanzas = async (req,res)=>{

    await Finanzas.findOne({})
    .then((finanza)=>{
        res.json({status:200,data:finanza})
    })

}

module.exports = controller