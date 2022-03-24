let controller = {};
const Producto = require("../models/Producto");
const Ventas = require("../models/Ventas");

//crear Producto
controller.crearProducto = async (req, res) => {
    const producto = new Producto(req.body);//creamos un nuevo producto
    Producto.findOne({producto})
    .then((data)=>{
        if(data!=null){
            // res.json({//respondemos correctamente
            //     status:500,
            //     mensaje:"Este Producto ya existe :("
            // })
        }
    })
    producto.save().then((data) => {//lo guardamos en la bd
        res.json({//respondemos correctamente
            status:200,
            mensaje:"Producto Creado"
        })
    })
        .catch((error) => {
            // res.json({//informamos de errores
            //     status: 500,
            //     mensaje: "Error en el Sistema"
                
            // })
        
        })

}

//Modificar Producto

controller.modificarProducto = async (req, res)=> {
    const {_id,nombre,valor,unidadMedida,descripcion,categoria,stock,color,imagen} = req.body

    await Producto.findByIdAndUpdate(_id,{$set:{
        nombre:nombre,
        valor:valor,
        unidadMedida:unidadMedida,
        descripcion:descripcion,
        categoria:categoria,
        stock:stock,
        color:color,
        imagen:imagen,
    }})
    .then(()=>{
        res.json({status:200,mensaje:"Actualizacion exitosa!!!"})
    })
    .catch((err)=>{
        
        res.json({status:500,mensaje:"Falla al actualizar!!!!"})
      
    })

}

//eliminar productos
controller.eliminarProducto = (req, res)=>{
    const _id = req.params.id;
  
    Producto.findOneAndDelete({_id})
    .then((data)=>{
        if(data== null){
            return res.json({
                status:500,
                mensaje: "Producto no encontrado"
            })
        }
        res.json({
            status: 200,
            mensaje:"Producto Eliminado"
        })
    })
    .catch((error)=>{
        res.json({
            status: 500,
            mensaje:"Error en el sistema"
        })
    })
}


controller.getProductos= async(req,res)=>{
    await Producto.find({},{

        nombre: 1,
        valor: 1,
        unidadMedida:1,
        descripcion: 1,
        categoria:1,
        stock:1,
        vecesComprado:1,
        color:1,

    })
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        
    })
}


controller.getForCategory = async (req,res) =>{
    const{ data } = req.body
   
    await Producto.find({categoria:data},{
        nombre: 1,
        valor: 1,
        unidadMedida:1,
        descripcion: 1,
        categoria:1,
        stock:1,
        vecesComprado:1,
        color:1,
    }).exec()
    .then((dataProduct)=>{
        
        res.json(dataProduct)
    })
    .catch((err)=>{
        
    })
}
controller.getOneProduct = async (req,res) =>{
    await Producto.findById(req.params.id)
    .then((data)=>{
        res.json({status:200,data:data})
    })
    .catch((err)=>{
       
        res.json({status:500,data:null})
    })
}


controller.addModifiProduct = async (req,res)=>{
    const{id} = req.body
    await Ventas.findById(id)
    .then((data)=>{
        var productos = data.productos;
        productos.forEach((productoSeleccionado)=>{
           
            var nombre = productoSeleccionado.nombre
            
            var cantidadProducto = productoSeleccionado.cantidad;
            
            Producto.findOne({nombre})
            .then((productoUnico)=>{
                var cantidadNow = productoUnico.vecesComprado;
                var stockNow = productoUnico.stock;
                var newStock = stockNow - productoSeleccionado.cantidad
                var newCantidad = cantidadNow + productoSeleccionado.cantidad

                Producto.findOneAndUpdate({nombre},{$set:{vecesComprado:newCantidad,stock:newStock}})
                .then(()=>{
                    res.json({status:200,mensaje:"Valor actualizado de manera satisfactoria!"})
                })
                .catch((err)=>{
              
                })
                
            })
        })
    })
    .catch((err)=>{
       
    })
}

controller.deleteModifiProduct = async (req,res)=>{
    const{id} = req.body
    await Ventas.findById(id)
    .then((data)=>{
        var productos = data.productos;
        productos.forEach((productoSeleccionado)=>{
           
            var nombre = productoSeleccionado.nombre
            
            var cantidadProducto = productoSeleccionado.cantidad;
            
            Producto.findOne({nombre})
            .then((productoUnico)=>{
                var cantidadNow = productoUnico.vecesComprado;
                var stockNow = productoUnico.stock;
                var newStock = stockNow + productoSeleccionado.cantidad
                var newCantidad = cantidadNow - productoSeleccionado.cantidad

                Producto.findOneAndUpdate({nombre},{$set:{vecesComprado:newCantidad,stock:newStock}})
                .then(()=>{
                    res.json({status:200,mensaje:"Valor actualizado de manera satisfactoria!"})
                })
                .catch((err)=>{
                   
                })
                
            })
            .catch((err)=>{
               
            })
        })
    })
    .catch((err)=>{
        
    })
}

controller.verifyStock = async (req,res)=>{
    const{id}= req.body;
    var bandera = 0
    var productoStock = 0
    var nombre 
    Ventas.findById(id)
    .then((venta)=>{
        var productos = venta.productos
        productos.forEach((producto)=>{
            var cantidad = producto.cantidad;
            var nombre = producto.nombre
            Producto.findOne({nombre})
            .then((productoBd)=>{
                var productoStock = productoBd.stock
                if((productoStock-cantidad) < 0){
                    bandera = 1

                }
            })
            .catch((err)=>{
            
            })
        })
        setTimeout(()=>{
            if(bandera === 1){
                res.json({status:500,mensaje:`revisa el stock de los productos seleccionados`})
            }
            else if(bandera === 0){
                res.json({status:200,mensaje:"venta valida!"})
            }
        },1000)
        
    })
    .catch((err)=>{
       
    })
    
}

module.exports = controller