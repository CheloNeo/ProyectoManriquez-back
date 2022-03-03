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

module.exports = controller
