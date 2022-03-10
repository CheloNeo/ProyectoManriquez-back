let controller = {}
const Cliente = require('../models/Cliente');
const Orden = require('../models/OrdenDeVenta');
const Ventas = require('../models/Ventas');
const Producto = require('../models/Producto')
let Venta = require('../models/Ventas');
const router = require('../routes/routes');



controller.crearVenta = async (req,res)=>{
   
    const venta = new Venta(req.body);
    console.log(venta,' soy la venta');
    venta.id_Venta = Date.now();
    venta.fecha = Date.now();
    rut_cliente = venta.cliente.rut
    proveedor = venta.proveedor
    comentario = venta.comentario
    await Cliente.findOne({rut:rut_cliente},{historial:1})
    .then((data)=>{
        if(data!=null){

            aux = data.historial
            aux.push(venta)
            Cliente.findOneAndUpdate({rut:rut_cliente},{$set: {historial:aux} } )
            .then((data)=>{
                
                var suma = 0
                venta.productos.forEach((producto)=>{
                    
                    suma = suma + producto.cantidad*producto.valor;
                })
                venta.totalDeVenta = suma



                venta.save().then(()=>{res.json({status:200,mensaje:"Ingreso exitoso!"})})
            })
            .catch((err)=>{
                res.json({status:500,mensaje:"Ingreso no exitoso!"})
            })

        }
        else{
            res.json({status:500,mensaje:"Usuario no encontrado!"})
        }
        
    })
}


controller.actualizarVenta= async (req,res)=>{
    const{id}=req.body;

    await Ventas.findById(id)
    .then((venta)=>{
        var suma = 0;
        venta.productos.forEach((producto)=>{
            suma = suma + producto.cantidad * producto.valor
        })
        Ventas.findByIdAndUpdate(id,{$set:{totalDeVenta:suma}})
        .then(()=>{
            res.json({status:200,mensaje:"Venta actualizada"})
        })
        .catch((err)=>{
            res.json({status:500,mensaje:"Venta no actualizada"})
        })
    })
    .catch((err)=>{
        res.json({status:500,mensaje:"Venta no actualizada"})
    })

}

controller.crearOrden = (req,res)=>{
    //crearemos la oden de compra
    try {
        const orden = new Orden(req.body);
        orden.save()
        .then((data)=>{
            res.json({status:200,mensaje:"Orden  guardada de manera exitosa!"});
        })
        .catch((err)=>{
            res.json({status:500,mensaje:"Orden fallida!"});
        })
    } catch (error) {
        res.json({status:500,mensaje:"Creacion de orden fallida!"});
    }

}

controller.filtrarVenta = async (req, res)=>{
    await Venta.findOne({"id_Venta":req.params.id}).exec()
    .then((data)=>{
        if(data == null){
            res.json({msg: "venta no encontrada"})
        }
        res.json(data);
    }).catch((err)=>{
        res.json({msg: "Id no es numerico"})
    })
}
controller.verificarEstado = async (req, res)=>{
    await Venta.findOne({"id_Venta":req.params.id}).exec()
    .then((data)=>{
        res.json({estado:data.estado})
    }).catch((err)=>{
        res.json({msg: "Venta no encontrado"})
    })
}

controller.getVenta = async (req,res)=>{
    try {
        await Venta.find({},{fecha:1,totalDeVenta:1,estado:1})
        .then((data)=>{
            res.json({status:200,data:data})
        })
    } catch (error) {
      
    }
}

controller.getVentaComponent = async(req,res)=>{
    try {
        await Venta.find({},{
            cliente:1,
            estado:1,
            productos:1,
            totalDeVenta:1,
            envio:1,

        }).then((data)=>{
            res.json(data)
        })
        .catch((err)=>{
           
        })
    } catch (error) {
        
    }
}


controller.getProductForId = async (req,res)=>{
    const{ id } = req.params
    try {
        await Ventas.findOne({_id:id},{_id:0,productos:1})
        .then((data)=>{
            res.json(data.productos);
        })
    } catch (error) {
       
    }
}

controller.deleteproducto = async (req,res)=>{
    const{aux,idVenta} = req.body;
    await Venta.findByIdAndUpdate(idVenta,{$set:{productos:aux}})
    .then((data)=>{
    
        res.json({status:200,mensaje:"elemento borrado"})
    })
    .catch((err)=>{
        res.json({status:500,mensaje:"Hubo un error"})
    })
}


controller.getVentaCliente = async (req,res)=>{
    const {rut} = req.params
    await Cliente.findOne({rut},{historial:1})
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
      
    })

}

controller.modificarEstado = async (req,res)=>{
    const{aux,rut,idVenta} = req.body;
  
    await Ventas.findByIdAndUpdate(idVenta,{$set:{estado:aux}})
    .then((ventaPermutada)=>{
        ventaPermutada.estado = aux

        

        Cliente.findOne({rut})
        .then((cliente)=>{
            var clienteData = cliente; //encontramos al cliente
            var historial = clienteData.historial; //rescatamos el historial
            var indexVenta
            historial.forEach((ventaUnica)=>{
                if(ventaUnica._id == idVenta){
                    indexVenta = historial.indexOf(ventaUnica)
            
                }
            })
            historial[indexVenta] = ventaPermutada
            Cliente.findOneAndUpdate({rut},{$set:{historial:historial}})
            .then(()=>{
                res.json({status:200,mensaje:ventaPermutada})
            })
            .catch((err)=>{
                res.json({status:500,mensaje:"Error en la actualizacion de historial"})
            })
        })
        .catch((err)=>{
         

            res.json({status:500,mensaje:"No se encontro el cliente!"})
        })

        
    })
    .catch((err)=>{
       
        res.json({status:500,mensaje:"No se encontro la venta :)"})
    })
    
}

controller.deleteVenta = async (req,res)=>{
    const {rut,id} = req.body;

    //delete venta
    await Venta.findByIdAndDelete(id)
    .then((venta)=>{
        Cliente.findOne({rut})
        .then((cliente)=>{
            var historial = cliente.historial;
            var historialAuxiliar = []
            var index 
            historial.forEach((ventaUnica)=>{
                if(ventaUnica._id != id){
                  historialAuxiliar.push(ventaUnica);
                }
            })
            
            Cliente.findOneAndUpdate({rut},{$set:{historial:historialAuxiliar}})
            .then(()=>{
                res.json({status:200,mensaje:"Data actualizada"})
            })
            .catch((err)=>{
     
                res.json({status:500,mensaje:"Data no actualizada"})
            })

        })
      

        .catch((err)=>{
            
            res.json({status:500,mensaje:"Data no actualizada"})
        })
    })
   

    .catch((err)=>{
    
        res.json({status:500,mensaje:"Data no actualizada"})
    })


}





module.exports = controller