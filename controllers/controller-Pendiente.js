let controller = {};
const Pendiente = require("../models/pendiente");

controller.addPendiente  = async (req,res)=>{
    
    
    const pendiente = new Pendiente(req.body)
    pendiente.save().then((data) => {
        res.json({ status: 200, mensaje: "Creacion exitosa" });
    })
    .catch((err) => {
        console.log(err)
        res.json({ status: 500, mensaje: "falla en la creacion" });
    })
    
    
  

}
controller.getPendiente  = async (req,res)=>{
    
    
    await Pendiente.find({}).exec()
    .then((data)=>{
        res.json({status:200,data:data})
    })
    .catch((err)=>{
        console.log(err)
        res.json({status:500})
    })
    
    
  

}
controller.getPendienteForId  = async (req,res)=>{
    
    
    await Pendiente.findById(req.params.id)
    .then((data)=>{
        res.json({status:200,data:data})
    })
    .catch((err)=>{
        console.log(err)
        res.json({status:500})
    })
    
    
  

}

controller.deleteAnteriores = async (req,res)=>{
    const {value}=req.body;
    
    await Pendiente.deleteMany({fecha:{$lt:value}})
    .then((data)=>{
       
        res.json({status:200,mensaje:"Eliminados con exito!"})
        
    })
    .catch((err)=>{
        console.log(err)
        res.json({status:500,mensaje:"No fueron eliminados!"})
    })
}
controller.deleteOne = async (req,res)=>{
    await Pendiente.findByIdAndRemove(req.params.id)
    .then(()=>{
        res.json({status:200,mensaje:"Eliminado!"})
    })
    .catch((err)=>{
        res.json({status:500,mensaje:"Hubo un error!"})
    })
}
controller.updateOne = async (req,res)=>{
    const{id,data:{_id,tipo,fecha,observacion}}=req.body
    var newfecha = new Date(fecha).getTime()
    await Pendiente.findByIdAndUpdate(id,{$set:{
        tipo:tipo,
        fecha:newfecha,
        observacion:observacion
    }})
    .then(()=>{
        res.json({status:200,mensaje:"Update exitoso"})
    })
    .catch((err)=>{
        res.json({status:500,mensaje:"Update no exitoso"})
    })
}

module.exports = controller
