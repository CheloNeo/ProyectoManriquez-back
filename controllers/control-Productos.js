let controller = {};
const Producto = require("../models/Producto");
const Ventas = require("../models/Ventas");

//crear Producto
controller.crearProducto = async (req, res) => {
    const producto = new Producto(req.body);//creamos un nuevo producto
    Producto.findOne({producto})
    .then((data)=>{
        if(data!=null){
            res.json({//respondemos correctamente
                status:500,
                mensaje:"Este Producto ya existe :("
            })
        }
    })
    producto.save().then((data) => {//lo guardamos en la bd
        res.json({//respondemos correctamente
            status:200,
            mensaje:"Producto Creado"
        })
    })
        .catch((error) => {
            res.json({//informamos de errores
                status: 500,
                mensaje: "Error en el Sistema"
                
            })
            // console.log(error)
        })

}

//Modificar Producto

controller.modificarProducto = async (req, res)=> {
    const {_id,nombre,valor,descripcion,categoria,stock,color,imagen} = req.body

    await Producto.findByIdAndUpdate(_id,{$set:{
        nombre:nombre,
        valor:valor,
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
    await Producto.find()
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        // console.log(err)
    })
}


controller.getForCategory = async (req,res) =>{
    const{ data } = req.body
    console.log(req.body)
    await Producto.find({categoria:data}).exec()
    .then((dataProduct)=>{
        // console.log(dataProduct)
        res.json(dataProduct)
    })
    .catch((err)=>{
        // console.log(err)
    })
}
controller.getOneProduct = async (req,res) =>{
    await Producto.findById(req.params.id)
    .then((data)=>{
        res.json({status:200,data:data})
    })
    .catch((err)=>{
        // console.log(err)
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
                    res.json({status:500,mensaje:err})
                })
                
            })
        })
    })
    .catch((err)=>{
        res.json({status:500,mensaje:err})
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
                    res.json({status:500,mensaje:err})
                })
                
            })
        })
    })
    .catch((err)=>{
        res.json({status:500,mensaje:err})
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
                // console.log(err)
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
        // console.log(err)
    })
    
}

module.exports = controller