let controller = {};

const Contador = require('../models/Contador');

controller.createContador = async(req,res) =>{
    let contador = new Contador();
    contador.save().then(()=>{res.json({status:200,mensaje:"Creado"})})
    .catch((err)=>{res.json({status:200,mensaje:"error!"})})
}


controller.sendContador = async(req,res)=>{

    const{tipo,valor}=req.params;
    try {
        if(tipo=="venta"){
            Contador.findOneAndUpdate({},
                {$set:{
                    NotaDeVenta: valor,
                }}
            ).then(()=>{res.json({status:200,mensaje:"Contador de venta actualizado"})})
            .catch((err)=>{res.json({status:500});console.log(err)})
        }
        else if(tipo=="cotizacion"){
            Contador.findOneAndUpdate({},
                {$set:{
                    Cotizacion: valor,
                }}
            ).then(()=>{res.json({status:200,mensaje:"Contador de cotizacion actualizado"})})
            .catch((err)=>{res.json({status:500});console.log(err)})
        }
    } catch (error) {
        res.json({status:500})
    }
}

controller.getContador = async(req,res)=>{

    const{tipo}=req.params;
   
 
    if(tipo=="venta"){
        Contador.findOne({})
        .then((data)=>{
            res.json({
                status:200,
                contador:data.NotaDeVenta,
                mensaje:"Contador rescatado con exito"
            })
        })
        .catch((err)=>{res.json({status:500,mensaje:"error"})})

    }
    else if(tipo=="cotizacion"){
        Contador.findOne({})
        .then((data)=>{
            res.json({
                status:200,
                contador:data.Cotizacion,
                mensaje:"Contador rescatado con exito"
            })
        })
        .catch((err)=>{res.json({status:500,mensaje:"error"})})
    }
    
}




module.exports = controller